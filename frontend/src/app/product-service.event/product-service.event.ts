import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../product-service';
@Component({
  selector: 'app-product-service-event',
  standalone: false,
  templateUrl: './product-service.event.html',
  styleUrl: './product-service.event.css',
})
export class ProductServiceEvent {
products: any;
constructor(private router: Router, private service: ProductService) {
  this.products = this.service.getProductsWithImages();
}
view_detail(p:any){
  this.router.navigate(["product-service-detail", p.ProductId]);
}
}