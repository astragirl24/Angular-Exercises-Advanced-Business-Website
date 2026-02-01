import { Component } from '@angular/core';
import { LaptopServiceAPI } from '../../myservices/laptop-service-api';

@Component({
  selector: 'app-laptop',
  standalone: false,
  templateUrl: './laptop.html',
  styleUrls: ['./laptop.css'] 
})
export class Laptops { 
  laptops: any;
  errMessage: string = '';
  constructor(private sv: LaptopServiceAPI) {
    this.sv.getLaptops().subscribe({
      next: (data) => { 
        this.laptops = data; 
        console.log("Dữ liệu Laptop:", data); 
      },
      error: (err) => { 
        this.errMessage = err.message; 
        console.log("Lỗi:", err);
      }
    });
  }
}