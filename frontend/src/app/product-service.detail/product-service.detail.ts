import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product-service'; 
@Component({
  selector: 'app-product-service-detail',
  standalone: false,
  templateUrl: './product-service.detail.html',
  styleUrl: './product-service.detail.css',
})
export class ProductServiceDetail implements OnInit {
  selected_product: any;
  constructor(private router: Router, private activerouter: ActivatedRoute, private service: ProductService){}
  ngOnInit(){
    let id = this.activerouter.snapshot.paramMap.get("id");
    this.selected_product = this.service.getProductDetail(id);
  }
  go_back(){
  this.router.navigate(["product-service-event"]);
}
}

