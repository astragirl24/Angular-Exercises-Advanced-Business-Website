import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
// Tên class chuẩn Angular tạo ra thường có chữ Service ở đuôi
export class LaptopServiceAPI { 
  constructor(private http: HttpClient) { }
  getLaptops(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/laptops');
  }
}