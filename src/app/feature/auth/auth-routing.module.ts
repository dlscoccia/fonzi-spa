import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { PublicGuard } from '@core/guard/publicGuard.guard';


const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'ingresar',
        component: LoginPageComponent,
        canActivate: [PublicGuard],
      },
      {
        path: 'registro',
        component: RegisterPageComponent,
        canActivate: [PublicGuard],
      },
      { path: '**', redirectTo: 'ingresar' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
