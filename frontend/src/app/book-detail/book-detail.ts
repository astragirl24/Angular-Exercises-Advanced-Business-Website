import { Component } from '@angular/core';
import { BookAPIService } from '../myservices/book-apiservice';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-detail',
  standalone: false,
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.css',
})
export class BookDetail {
  book: any;
  errMessage: string = '';

  constructor(
    private _service: BookAPIService, 
    private router: Router, 
    private activeRouter: ActivatedRoute
  ) { 
    activeRouter.params.subscribe(params => {
      let id = params['id']; 
      if (id != null) {
        this.searchBook(id);
      }
    });
  }

  searchBook(bookId: string) {
    this._service.getBook(bookId).subscribe({
      next: (data) => { this.book = data },
      error: (err) => { this.errMessage = err }
    });
  }
}