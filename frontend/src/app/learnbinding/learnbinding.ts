import { Component } from '@angular/core';

@Component({
  selector: 'app-learnbinding',
  standalone: false,
  templateUrl: './learnbinding.html',
  styleUrl: './learnbinding.css',
})
export class Learnbinding {
  student_id: string='K234111390';
  student_name: string='Đỗ Thị Diễm Hương';
  student_location: string='Phường An Hội Đông - Thành phố Hồ Chí Minh';
  red_text_style: string='color: red;';
}
