import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { organizeReservations } from '@shared/utils/organizeReservations';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ReservationsService {
  constructor(protected http: HttpService) {}

  getReservation(id) {
    return this.http
      .doGet(`${environment.endpoint}/reservations/${id}`)
      .pipe(map((response: any) => response));
  }

  getReservations() {
    return this.http
      .doGet(`${environment.endpoint}/reservations`)
      .pipe(map((response: any) => response));
  }

  getTakenDates() {
    return this.getReservations().pipe(
      map((data) => organizeReservations(data))
    );
  }

  updateReservation(reservation): void {
    console.log('res', reservation);
    this.getReservation(reservation.id).pipe(
      map((data) => console.log('data', data))
    );
  }
}
