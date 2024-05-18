import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ReservationsService } from '../../../core/services/reservations-service.service';
import { AuthService } from '@core/services/auth.service';
import { User } from '@core/modelo/user.interface';

@Component({
  selector: 'app-reservations-page',
  templateUrl: './reservations-page.component.html',
  styleUrls: ['./reservations-page.component.css'],
})
export class ReservationsPageComponent implements OnInit {
  reservations = [];
  currentUser: User;
  editModalVisible = false;
  currentRow;

  constructor(
    private reservationService: ReservationsService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.getStaticInfo();

    this.cdr.detectChanges();
  }

  getStaticInfo() {
    this.reservationService.getReservations().subscribe({
      next: (reservations) => {
        this.reservations = reservations.filter(
          (reservation) => reservation.username === this.currentUser.username
        );
      },
      error: (error) => console.log(error),
    });
  }

  handleSelection(selectedRow) {
    this.currentRow = selectedRow;
    this.editModalVisible = true;
  }
}
