import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthStatus } from '../modelo';
import { CheckTokenResponse } from '@core/modelo/check-token.response';
import { User } from '@core/modelo/user.interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  currentUser = signal<User | null>(null);
  authStatus = signal<AuthStatus>(AuthStatus.checking);

  private baseUrl = environment.endpoint;
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  constructor(private http: HttpClient, private router: Router) {
    this.loadUserFromLocalStorage();
  }

  login(username: string, password: string): Observable<any> {
    return this.http.get<User[]>(`${this.baseUrl}/users`).pipe(
      map((users) => {
        const validUser: User[] = users.filter(
          (user) => user.username === username && user.password === password
        );

        if (validUser.length > 0) {
          const token = this.generateToken(validUser);
          localStorage.setItem('currentUser', JSON.stringify(validUser));
          localStorage.setItem('token', token);
          this.setAuthentication(validUser[0], token);
          return { validUser, token };
        }

        return Swal.fire({
          title: 'Algo salio mal...',
          text: 'Usuario invalido',
          icon: 'error',
        });
      }),
      catchError((error) => throwError(() => new Error(error)))
    );
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/users`, { name, password, username: email })
      .pipe(
        map((user) => {
          const token = this.generateToken(user);
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('token', token);

          return { user, token };
        }),
        catchError((error) => throwError(() => new Error(error)))
      );
  }

  generateToken(user: any): string {
    const token = btoa(
      JSON.stringify({ id: user.id, username: user.username })
    );
    this.http
      .post(`${this.baseUrl}/tokens`, { userId: user.id, token })
      .subscribe();

    return token;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUser.set(null);
    this.authStatus.set(AuthStatus.notAuthenticated);
    this.router.navigateByUrl('/inicio');
  }

  checkAuthStatus(): Observable<boolean> {
    const url = `${this.baseUrl}/tokens`;
    const gotToken = localStorage.getItem('token');

    if (!gotToken) {
      this.logout();
      return of(false);
    }

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${gotToken}`
    );

    return this.http.get<CheckTokenResponse>(url, { headers }).pipe(
      map(({ user, token }) => this.setAuthentication(user, token)),
      catchError(() => {
        this._authStatus.set(AuthStatus.notAuthenticated);
        return of(false);
      })
    );
  }

  getCurrentUser() {
    return this.currentUser();
  }

  private setAuthentication(user: User, token: string): boolean {
    this.currentUser.set(user);
    this.authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('token', token);

    return true;
  }

  private loadUserFromLocalStorage() {
    const userData = localStorage.getItem('currentUser');
    const token = localStorage.getItem('token');

    if (userData && token) {
      const user = JSON.parse(userData);
      this.currentUser.set(user);
      this.authStatus.set(AuthStatus.authenticated);
    } else {
      this.authStatus.set(AuthStatus.notAuthenticated);
    }
  }
}
