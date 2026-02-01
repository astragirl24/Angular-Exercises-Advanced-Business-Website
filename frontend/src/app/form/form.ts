import { Component } from '@angular/core';
import { Student } from '../myclasses/student';

@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.html', // Chắc chắn tên file này đúng
  styleUrls: ['./form.css'], // Sửa styleUrl -> styleUrls (số nhiều)
})
export class Form {
  // 1. Khởi tạo Model (Khớp với constructor bên file Student.ts)
  studentModel = new Student(
    'Diễm Hương', 
    'dtdh2425@gmail.com', 
    '0865357647', 
    'python', 
    'Sáng'
  );

  // 2. Danh sách khóa học đổ vào thẻ Select
  courses = ['python', 'Angular', 'React', 'Vue', 'NodeJS'];
  
  // Biến cờ kiểm tra lỗi (Dùng cho Custom Validate nếu cần)
  errFlag = false;

  constructor() {}

  // 3. Hàm Validate thủ công (Nếu bạn muốn dùng sự kiện (change)="validateCourse(...)")
  validateCourse(value: string): void {
    if (value === 'default' || value === '') {
      this.errFlag = true;
    } else {
      this.errFlag = false;
    }
  }

  // 4. QUAN TRỌNG: Hàm này được gọi khi bấm nút Submit bên HTML
  onSubmit(form: any): void {
    // Kiểm tra biến form của Angular xem hợp lệ chưa
    if (form.valid && !this.errFlag) {
      console.log('Form hợp lệ! Gửi dữ liệu đi:', this.studentModel);
      alert('Đăng ký thành công khóa học: ' + this.studentModel.course);
    } else {
      console.log('Form chưa hợp lệ');
    }
  }
}