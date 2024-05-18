import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutPageComponent } from './pages/checkout-page.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [CheckoutPageComponent],
  imports: [CommonModule, SharedModule],
})
export class CheckoutModule {}
