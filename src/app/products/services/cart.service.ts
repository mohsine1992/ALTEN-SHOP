import { Injectable, signal } from '@angular/core';
import { Product } from '../data-access/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  
  public products = signal<Product[]>([]);

  getProducts() {
    return this.products();
  }

  addProduct(product: Product) {
    const existingProductIndex = this.products().findIndex(p => p.id === product.id);

    if (existingProductIndex > -1) {
      this.products.update(currentProducts => {
        const updatedProducts = [...currentProducts];
        updatedProducts[existingProductIndex].quantity += 1;
        return updatedProducts;
      });
    } else {
      const newProduct = { ...product, quantity: 1 }; 
      this.products.update(currentProducts => [
        ...currentProducts,
        newProduct
      ]);
    }
  }
  removeProduct(productId: number) {
    this.products.update(currentProducts => {
      const existingProductIndex = currentProducts.findIndex(product => product.id === productId);

      if (existingProductIndex > -1) {
        const updatedProducts = [...currentProducts];
        updatedProducts[existingProductIndex].quantity -= 1;
        if (updatedProducts[existingProductIndex].quantity <= 0) {
          updatedProducts.splice(existingProductIndex, 1);
        }
        return updatedProducts;
      }
      return currentProducts;
    });
  }

  getProductCount(): number {
    return this.products().length;
  }
  constructor() { }
}
