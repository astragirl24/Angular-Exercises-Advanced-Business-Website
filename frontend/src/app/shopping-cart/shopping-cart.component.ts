import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-shopping-cart',
    standalone: true,
    imports: [CommonModule, HttpClientModule, FormsModule],
    templateUrl: './shopping-cart.component.html',
    styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
    visitMessage: string = '';
    products: any[] = [];
    cart: any[] = [];

    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.loadProducts();
        this.loadCart();
    }

    testSession() {
        this.http.get<{ message: string }>('http://localhost:3002/contact', { withCredentials: true }).subscribe({
            next: (res) => this.visitMessage = res.message,
            error: (err) => console.error('Error testing session', err)
        });
    }

    loadProducts() {
        this.http.get<any[]>('http://localhost:3002/products', { withCredentials: true }).subscribe({
            next: (res) => this.products = res,
            error: (err) => console.error('Error loading products', err)
        });
    }

    loadCart() {
        this.http.get<any[]>('http://localhost:3002/cart/view', { withCredentials: true }).subscribe({
            next: (res) => this.cart = res,
            error: (err) => console.error('Error loading cart', err)
        });
    }

    addToCart(product: any) {
        this.http.post<any[]>('http://localhost:3002/cart/add', product, { withCredentials: true }).subscribe({
            next: (res) => this.cart = res,
            error: (err) => console.error('Error adding to cart', err)
        });
    }

    updateCart(productId: number, quantity: number) {
        const body = { productId, quantity };
        this.http.post<any[]>('http://localhost:3002/cart/update', body, { withCredentials: true }).subscribe({
            next: (res) => this.cart = res,
            error: (err) => console.error('Error updating cart', err)
        });
    }

    removeFromCart(productId: number) {
        const body = { productId };
        this.http.post<any[]>('http://localhost:3002/cart/remove', body, { withCredentials: true }).subscribe({
            next: (res) => this.cart = res,
            error: (err) => console.error('Error removing from cart', err)
        });
    }
}
