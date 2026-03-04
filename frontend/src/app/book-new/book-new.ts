import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookAPIService } from '../myservices/book-apiservice';

@Component({
  selector: 'app-book-new',
  standalone: false,
  templateUrl: './book-new.html',
  styleUrl: './book-new.css',
})
export class BookNew {
  book = { BookId: '', BookName: '', Price: 0, Image: '' }; 

  constructor(private _service: BookAPIService, private _router: Router) { }

  postBook() {
    this._service.postBook(this.book).subscribe({
      next: (data:any) => { this._router.navigate(['/books']); }, 
      error: (err:any) => { console.log(err); }
    });
  }
}
