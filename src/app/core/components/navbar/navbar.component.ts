import { MenuOption } from './../../modelo/menu-item';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { AuthStatus } from '@core/modelo';
import { AuthService } from '@core/services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-shared-navbar',
  templateUrl: './navbar.component.html',
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  isLoggedIn: string;
  menuItems: MenuOption[];

  routes = [
    { routerLink: '/inicio', label: 'Inicio', icon: 'pi pi-fw pi-home' },
    {
      routerLink: '/inicio/servicios',
      label: 'Servicios',
      icon: 'pi pi-fw pi-star',
    },
    {
      routerLink: '/inicio/instalaciones',
      label: 'Instalaciones',
      icon: 'pi pi-fw pi-th-large',
    },
  ];

  publicRoutes = [
    {
      routerLink: '/auth/ingresar',
      label: 'Ingresa',
      icon: 'pi pi-fw pi-sign-in',
    },
    {
      routerLink: '/auth/registro',
      label: 'Registrate',
      icon: 'pi pi-fw pi-send',
    },
  ];

  privateRoutes = [
    {
      label: 'Mis Reservas',
      icon: 'pi pi-fw pi-calendar',
      routerLink: '/reservas',
    },
    {
      label: 'Salir',
      icon: 'pi pi-fw pi-sign-out',
      command: () => {
        this.authService.logout();
      },
    },
  ];

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.authStatus();
    this.menuItems =
      this.isLoggedIn === AuthStatus.authenticated
        ? [...this.routes, ...this.privateRoutes]
        : [...this.routes, ...this.publicRoutes];
    this.cdr.detectChanges();
  }
}
