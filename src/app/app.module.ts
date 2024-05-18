import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { CoreModule } from '@core/core.module';
import { CookieService } from 'ngx-cookie-service';

import { SharedModule } from '@shared/shared.module';
import { StyleClassModule } from 'primeng/styleclass';
import { AuthService } from '@core/services/auth.service';
import { ReservationsService } from './core/services/reservations-service.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    StyleClassModule,
  ],
  providers: [CookieService, AuthService, ReservationsService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
