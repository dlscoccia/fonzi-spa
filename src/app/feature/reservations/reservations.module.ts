import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { ReservationsPageComponent } from './pages/reservations-page.component';
import { ReservationTableComponent } from './components/reservation-table/reservation-table.component';

@NgModule({
  declarations: [ReservationsPageComponent, ReservationTableComponent],
  imports: [CommonModule, SharedModule],
})
export class ReservationsModule {}
