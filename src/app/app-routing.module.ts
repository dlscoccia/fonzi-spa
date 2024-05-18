import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@core/guard/authGuard.guard';
import { CheckoutPageComponent } from './feature/checkout/pages/checkout-page.component';
import { ReservationsPageComponent } from './feature/reservations/pages/reservations-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  {
    path: 'inicio',
    canActivate: [],
    loadChildren: () =>
      import('./feature/home/home.module').then((mod) => mod.HomeModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./feature/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'checkout',
    component: CheckoutPageComponent,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./feature/checkout/checkout.module').then(
        (m) => m.CheckoutModule
      ),
  },
  {
    path: 'reservas',
    component: ReservationsPageComponent,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./feature/reservations/reservations.module').then(
        (m) => m.ReservationsModule
      ),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
