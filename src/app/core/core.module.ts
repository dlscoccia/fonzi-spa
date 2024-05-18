import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityGuard } from './guard/security.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptor/token-interceptor';
import { AuthInterceptor } from './interceptor/auth-interceptor';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpService } from './services/http.service';
import { ManejadorError } from './interceptor/manejador-error';
import { RouterModule } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { TabMenuModule } from 'primeng/tabmenu';
import { BadgeModule } from 'primeng/badge';
import { MenuModule } from 'primeng/menu';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { SharedModule } from '@shared/shared.module';
import { UiComponentsModule } from '@shared/ui-components/ui-components.module';
import { FooterComponent } from './components/footer/footer.component';
import { ShoppingCartService } from './services/shopping-cart-services.service';
import { CheckoutService } from '../feature/checkout/services/checkout-services.service';

@NgModule({
  declarations: [NavbarComponent, ShoppingCartComponent, FooterComponent],
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    TabMenuModule,
    BadgeModule,
    MenuModule,
    SharedModule,
    UiComponentsModule,
  ],
  exports: [NavbarComponent, ShoppingCartComponent, FooterComponent],
  providers: [
    HttpService,
    SecurityGuard,
    ShoppingCartService,
    CheckoutService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: ErrorHandler, useClass: ManejadorError },
  ],
})
export class CoreModule {}
