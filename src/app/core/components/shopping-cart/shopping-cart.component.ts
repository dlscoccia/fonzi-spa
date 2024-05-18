import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@core/modelo/user.interface';
import { AuthService } from '@core/services/auth.service';
import { ShoppingCartService } from '@core/services/shopping-cart-services.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  itemsInCart = [];
  totalAmount = 0;
  sidebarVisible = false;
  currentUser: User | null = null;

  constructor(
    private shoppingCartService: ShoppingCartService,
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
    this.cdr.detectChanges();
  }

  handleReserve() {
    this.sidebarVisible = false;
    this.router.navigateByUrl('/checkout');
  }
}
