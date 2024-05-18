import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationsService } from '@core/services/reservations-service.service';
import { AppointmentTimes } from '@shared/models/data-form.interface';
import { generateTimeSlots } from '@shared/utils/generateTimeSlots';
import { differenceInHours, format } from 'date-fns';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-reservation-table',
  templateUrl: './reservation-table.component.html',
  styleUrls: ['./reservation-table.component.css'],
})
export class ReservationTableComponent implements OnInit, OnChanges {
  @Input({ required: true }) reservations;
  @Output() selectedRow = new EventEmitter<boolean>();
  cols!: Column[];
  editVisible = false;
  cancelVisible = false;
  myForm: FormGroup;
  minDate: Date | undefined;
  rechargedTotal: boolean;
  appointmentTimes: AppointmentTimes[] = generateTimeSlots();
  takenDates;
  validDates = this.appointmentTimes;

  constructor(
    private fb: FormBuilder,
    private reservationsService: ReservationsService
  ) {}

  ngOnInit() {
    this.minDate = new Date();
    this.cols = [
      { field: 'name', header: 'Nombre' },
      { field: 'date', header: 'Fecha' },
      { field: 'numberGuests', header: 'Cantidad' },
      { field: 'total', header: 'Total' },
      { field: '', header: 'Total' },
    ];

    this.myForm = this.fb.group({
      numberGuests: ['', [Validators.required, Validators.min(1)]],
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
      observations: [''],
    });
  }

  ngOnChanges(): void {
    this.takenDates = this.reservationsService.getTakenDates().subscribe({
      next: (dates) => {
        this.takenDates = dates;
      },
      error: (error) => console.log('Error loading taken dates:', error),
    });
  }

  handleModal(action) {
    if (action === 'edit') {
      this.editVisible = true;
    } else {
      this.cancelVisible = true;
    }
  }

  handleTotal(date: Date, total: number) {
    const result = differenceInHours(new Date(date), new Date());

    if (result <= 48) {
      this.rechargedTotal = true;
    } else {
      this.rechargedTotal = false;
    }

    return result > 48 ? total : total * 1.2;
  }

  handleSubmit(item, action) {
    if (this.myForm.invalid) return;

    if (action === 'edit') {
      this.reservationsService.updateReservation(item);
    }
  }

  handleTakenDates() {
    const appoinmentDate = format(this.myForm.value.date, 'MM/dd/yyyy');
    const filter = this.appointmentTimes.filter(
      (time) => !this.takenDates[appoinmentDate].includes(time.key)
    );

    this.validDates = filter;
  }
}
