import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  datas = [
    {
      "Cateid": "cate1", "CateName": "NƯỚC NGỌT",
      "Products": [
        { "ProductId": "p1", "ProductName": "Coca", "Price": 100.000, "Image": "assets/coca.jpeg" },
        { "ProductId": "p2", "ProductName": "Pepsi", "Price": 300.000, "Image": "assets/pepsi.jpg" },
        { "ProductId": "p3", "ProductName": "Sting", "Price": 200.000, "Image": "assets/sting.jpg" },
      ]
    },
    {
      "Cateid": "cate2", "CateName": "BIA",
      "Products": [
        { "ProductId": "p4", "ProductName": "Heineken", "Price": 500.000, "Image": "assets/heineken.jpg" },
        { "ProductId": "p5", "ProductName": "333", "Price": 400.000, "Image": "assets/333.jpg" },
        { "ProductId": "p6", "ProductName": "Sài Gòn", "Price": 600.000, "Image": "assets/saigon.jpg" },
      ]
    },
  ];

  constructor() { }

  getCategories() {
    return this.datas;
  }
}