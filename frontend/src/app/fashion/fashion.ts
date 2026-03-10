import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Cần thiết để dùng *ngFor, *ngIf
import { RouterModule } from '@angular/router';
// 1. Định nghĩa cấu trúc dữ liệu dựa trên file JSON của bạn
export interface Fashion {
  _id: string;
  style: string;
  fashion_subject: string;
  fashion_detail: string;
  fashion_image: string; // Chứa chuỗi Base64 của ảnh
}

@Component({
  selector: 'app-fashion',
  standalone: true, // Nếu bạn đang dùng Standalone Component
  imports: [CommonModule, RouterModule],
  templateUrl: './fashion.html',
  // styleUrls: ['./fashion.css']
})
export class FashionComponent implements OnInit {
  fashions: Fashion[] = []; // Mảng chứa dữ liệu
  isLoading: boolean = true; // Trạng thái chờ load dữ liệu

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getFashions();
  }

  getFashions() {
    // 2. Gọi API đến Backend Node.js
    this.http.get<Fashion[]>('http://localhost:3002/fashions').subscribe({
      next: (data) => {
        this.fashions = data; // Gán dữ liệu trả về vào mảng
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Lỗi khi lấy dữ liệu:', err);
        this.isLoading = false;
      }
    });
  }
}