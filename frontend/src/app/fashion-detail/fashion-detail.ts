import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fashion-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fashion-detail.html'
})
export class FashionDetailComponent implements OnInit {
  fashion: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    // Lấy ID từ URL
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getFashionDetail(id);
    }
  }

  getFashionDetail(id: string) {
    this.http.get(`http://localhost:3002/fashions/${id}`).subscribe(data => {
      this.fashion = data;
    });
  }

  goBack() {
    this.router.navigate(['/thoi-trang']);
  }
}