import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Rất quan trọng cho *ngFor
import { FashionAPIService } from '../fashion-api.service';

@Component({
  selector: 'app-fashion',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './fashion.html',
  styleUrls: ['./fashion.css']
})
export class FashionComponent {
  fashions: any;
  errMessage: string = '';

  constructor(public _service: FashionAPIService) {
    this._service.getFashions().subscribe({
      next: (data) => { this.fashions = data },
      error: (err) => { this.errMessage = err }
    });
  }
}