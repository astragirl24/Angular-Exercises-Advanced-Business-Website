import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-customer-http-group',
  standalone: false,
  templateUrl: './customer-http-group.html',
  styleUrls: ['./customer-http-group.css'], 
})
export class CustomerHttpGroup implements OnInit {
  
  customers: any = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    this.http.get<any[]>('./assets/data/customers.json').subscribe({
   
      next: (result) => {
        this.customers = result;
        console.log('Đã lấy được dữ liệu:', this.customers);
      },
      error: (error) => {
        console.error('Lỗi không lấy được dữ liệu:', error);
      }
    });
  }
}