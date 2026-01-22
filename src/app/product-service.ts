import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor() { }
  productsImage = [
    { ProductId: "P1", ProductName: "COCA COLA", Price: 10000, Image: "assets/coca.jpeg" },
    { ProductId: "P2", ProductName: "PEPSI", Price: 30000, Image: "assets/pepsi.jpg" },
    { ProductId: "P3", ProductName: "STING", Price: 20000, Image: "assets/sting.jpg" },
    { ProductId: "P4", ProductName: "SAI GON", Price: 15000, Image: "assets/saigon.jpg" },
    { ProductId: "P5", ProductName: "HEINEKEN", Price: 50000, Image: "assets/heineken.jpg" }
  ];

  //Hàm lấy tất cả sản phẩm
  getProductsWithImages() {
    return this.productsImage;
  }

  // 3. Hàm tìm sản phẩm theo ID
  getProductDetail(id: any) {
    return this.productsImage.find(x => x.ProductId == id);
  }
}