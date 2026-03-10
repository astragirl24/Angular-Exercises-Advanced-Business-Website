import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Bắt buộc để dùng ngModel

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html'
})
export class Login implements OnInit {
  username = '';
  password = '';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // Đoạn code AI viết để đọc cookie (giữ nguyên nếu có)
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith('username=')) {
        this.username = cookie.substring('username='.length);
      }
      if (cookie.startsWith('password=')) {
        this.password = cookie.substring('password='.length);
      }
    }
  }

  // 👇 ĐÂY CHÍNH LÀ HÀM BỊ THIẾU, COPY VÀO NHÉ 👇
  login() {
    const body = { username: this.username, password: this.password };

    // Gọi API sang backend port 3002
    this.http.post('http://localhost:3002/auth/login', body, { withCredentials: true })
      .subscribe({
        next: (res: any) => {
          alert('Đăng nhập thành công! F5 lại trang để xem Cookie tự điền nhé.');
          console.log(res);
        },
        error: (err) => {
          alert('Đăng nhập thất bại: Sai tài khoản hoặc mật khẩu!');
          console.error(err);
        }
      });
  }
}