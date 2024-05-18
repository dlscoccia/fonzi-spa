import { Component, inject, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationsService } from '@core/services/reservations-service.service';
import { ShoppingCartService } from '@core/services/shopping-cart-services.service';
import { AppointmentTimes } from '@shared/models/data-form.interface';
import { generateTimeSlots } from '@shared/utils/generateTimeSlots';
import { format } from 'date-fns';
import Swal from 'sweetalert2';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.css'],
})
export class ServiceCardComponent implements OnInit, OnChanges {
  @Input({ required: true }) item;

  errors = {
    required: 'Este campo es <b>obligatorio</b>',
  };

  visible = false;
  minDate: Date | undefined;
  totalAmount = 0;
  appointmentTimes: AppointmentTimes[] = generateTimeSlots();
  takenDates;
  validDates = this.appointmentTimes;

  fb = inject(FormBuilder);
  myForm: FormGroup = this.fb.group({
    numberGuests: ['', [Validators.required, Validators.min(1)]],
    date: ['', [Validators.required]],
    time: ['', [Validators.required]],
    observations: [''],
  });

  private shoppingCartService = inject(ShoppingCartService);
  private reservationsService = inject(ReservationsService);

  ngOnInit() {
    this.minDate = new Date();
  }

  ngOnChanges(): void {
    this.totalAmount =
      Number(this.myForm.value.numberGuests) * Number(this.item.price);

    this.takenDates = this.reservationsService.getTakenDates().subscribe({
      next: (dates) => {
        this.takenDates = dates;
      },
      error: (error) => console.log('Error loading taken dates:', error),
    });
  }

  showDialog() {
    this.visible = true;
  }

  handleSubmit() {
    if (this.myForm.invalid) return;

    const total = this.handleTotal(
      this.myForm.value.numberGuests,
      this.item.price
    );

    this.shoppingCartService.addToCart({
      ...this.myForm.value,
      id: uuid(),
      total,
      name: this.item.name,
      time: this.myForm.value.time.key,
      date: format(this.myForm.value.date, 'MM/dd/yyyy'),
    });

    this.visible = false;
    this.myForm.reset();

    Swal.fire({
      title: 'Reserva agregada!',
      icon: 'success',
    });
  }

  handleTotal(numberGuest: number, price: number) {
    const totalAmount = numberGuest * price;
    return numberGuest < 4 ? totalAmount : totalAmount * 0.9;
  }

  handleTakenDates() {
    const appoinmentDate = format(this.myForm.value.date, 'MM/dd/yyyy');
    const filter = this.appointmentTimes.filter(
      (time) => !this.takenDates[appoinmentDate].includes(time.key)
    );

    this.validDates = filter;
  }
}
