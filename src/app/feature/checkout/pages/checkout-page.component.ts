import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartService } from '@core/services/shopping-cart-services.service';
import { CheckoutService } from '../services/checkout-services.service';
import Swal from 'sweetalert2';
import { AuthService } from '@core/services/auth.service';
import { User } from '@core/modelo/user.interface';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css'],
})
export class CheckoutPageComponent implements OnInit {
  itemsInCart = [];
  totalAmount = 0;
  sidebarVisible = false;
  cols!: Column[];
  cancelVisible = false;
  confirmVisible = false;
  currentUser: User;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private checkoutService: CheckoutService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.shoppingCartService.getItems().subscribe((items) => {
      this.itemsInCart = items;
      this.totalAmount = this.shoppingCartService.getTotalAmount();
    });

    this.currentUser = this.authService.getCurrentUser();

    console.log('items', this.itemsInCart);

    this.cdr.detectChanges();

    this.cols = [
      { field: 'name', header: 'Nombre' },
      { field: 'date', header: 'Fecha' },
      { field: 'numberGuests', header: 'Cantidad' },
      { field: 'total', header: 'Total' },
      { field: '', header: 'Total' },
    ];
  }

  handleReserve() {
    const reservationRequest = {
      username: this.currentUser.username,
      reservation: this.itemsInCart,
    };

    this.checkoutService.saveReservations(reservationRequest).subscribe({
      error: (error) =>
        Swal.fire({
          title: 'Algo salio mal...',
          text: error,
          icon: 'error',
        }),
    });

    this.sidebarVisible = false;
    this.confirmVisible = false;
    this.router.navigateByUrl('/reservas');
  }

  handleRemoveItem(id: string) {
    this.shoppingCartService.removeItemFromCart(id);
  }

  handleClearCart() {
    this.shoppingCartService.clearCartItems();
    this.cancelVisible = false;
  }
}
