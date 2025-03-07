import { Component, inject, OnInit, signal } from '@angular/core';
import { Product } from 'app/products/data-access/product.model';
import { CartService } from 'app/products/services/cart.service';
import { BadgeModule } from 'primeng/badge';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [BadgeModule, OverlayPanelModule, ButtonModule, CommonModule],
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);
  ngOnInit() {
  }
  getTotal() {
    return this.cartService.getProducts().reduce((total, item) => total + (item.price * item.quantity), 0);
}
  getTotalItemCount() {
    return this.cartService.getProducts().reduce((total, item) => total + item.quantity, 0);
  }
  removeFromCart(productId: number) {
    this.cartService.removeProduct(productId);
  }
  getProducts() {
    return this.cartService.getProducts();
  }
}
