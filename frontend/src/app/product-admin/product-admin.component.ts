import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-product-admin',
    standalone: true,
    imports: [CommonModule, HttpClientModule, FormsModule],
    templateUrl: './product-admin.component.html',
    styleUrls: ['./product-admin.component.css']
})
export class ProductAdminComponent implements OnInit {
    products: any[] = [];
    currentProduct: any = { name: '', price: null, description: '', image_url: '' };
    isEditing: boolean = false;

    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.getProducts();
    }

    getProducts() {
        this.http.get<any[]>('http://localhost:3002/api/products', { withCredentials: true }).subscribe({
            next: (res) => this.products = res,
            error: (err) => console.error('Error fetching products', err)
        });
    }

    saveProduct() {
        if (this.isEditing) {
            // Update
            const id = this.currentProduct._id;
            // Copy without the _id to send clean payload
            const payload = { ...this.currentProduct };
            delete payload._id;

            this.http.put(`http://localhost:3002/api/products/${id}`, payload, { withCredentials: true }).subscribe({
                next: () => {
                    this.getProducts();
                    this.resetForm();
                },
                error: (err) => console.error('Error updating product', err)
            });
        } else {
            // Add new
            this.http.post('http://localhost:3002/api/products', this.currentProduct, { withCredentials: true }).subscribe({
                next: () => {
                    this.getProducts();
                    this.resetForm();
                },
                error: (err) => console.error('Error adding product', err)
            });
        }
    }

    editProduct(product: any) {
        this.isEditing = true;
        this.currentProduct = { ...product }; // Load directly into the form model
    }

    deleteProduct(id: string) {
        if (confirm('Are you sure you want to delete this product?')) {
            this.http.delete(`http://localhost:3002/api/products/${id}`, { withCredentials: true }).subscribe({
                next: () => {
                    this.products = this.products.filter(p => p._id !== id);
                },
                error: (err) => console.error('Error deleting product', err)
            });
        }
    }

    resetForm() {
        this.isEditing = false;
        this.currentProduct = { name: '', price: null, description: '', image_url: '' };
    }
}
