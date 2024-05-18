import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class CheckoutService {
  private itemsInCartSubject: BehaviorSubject<any[]> = new BehaviorSubject([]);
  private itemsInCart: any[] = [];

  constructor(private http: HttpService) {
    this.itemsInCartSubject.subscribe((_) => (this.itemsInCart = _));
  }

  public addToCart(item: any) {
    this.itemsInCartSubject.next([...this.itemsInCart, item]);
  }

  public getItems(): Observable<any[]> {
    return this.itemsInCartSubject.asObservable();
  }

  public getTotalAmount(): number {
    return this.itemsInCart.reduce((total, item) => total + item.price, 0);
  }

  public saveReservations(reservations) {
    return this.http
      .doPost(`${environment.endpoint}/reservations`, reservations)
      .pipe(map((response: any) => response));
  }
}
