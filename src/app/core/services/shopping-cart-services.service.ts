import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class ShoppingCartService {
  private itemsInCartSubject: BehaviorSubject<any[]> = new BehaviorSubject([]);
  private itemsInCart: any[] = [];

  constructor() {
    this.loadInitialData();
    this.itemsInCartSubject.subscribe((items) => {
      this.itemsInCart = items;
      localStorage.setItem('itemsInCart', JSON.stringify(items));
    });
  }

  public addToCart(item: any) {
    this.itemsInCartSubject.next([...this.itemsInCart, item]);
    localStorage.setItem('itemsInCart', JSON.stringify([...this.itemsInCart]));
  }

  public getItems(): Observable<any[]> {
    return this.itemsInCartSubject.asObservable();
  }

  public getTotalAmount(): number {
    return this.itemsInCart.reduce((total, item) => total + item.total, 0);
  }

  public removeItemFromCart(id) {
    const newCartItems = this.itemsInCart.filter(
      (cartItem) => id !== cartItem.id
    );
    this.itemsInCartSubject.next([...newCartItems]);
  }

  public clearCartItems() {
    this.itemsInCartSubject.next([]);
  }

  private loadInitialData() {
    const existingCartItems = localStorage.getItem('itemsInCart');
    if (existingCartItems) {
      this.itemsInCart = JSON.parse(existingCartItems);
    } else {
      this.itemsInCart = [];
    }
    this.itemsInCartSubject = new BehaviorSubject<any[]>(this.itemsInCart);
  }
}
