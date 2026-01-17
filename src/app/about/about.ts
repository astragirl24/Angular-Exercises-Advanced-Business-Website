import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class AboutComponent {
  student_id: string='K234111390';
  student_name: string='Đỗ Thị Diễm Hương';
  student_class: string='Thương mại điện tử - CLC1';
  student_school: string='Đại học Kinh tế - Luật';
  student_email: string='huongdtd234111e@st.uel.edu.vn';
  logoUEL:string = 'assets/uni_logo.png';
}
