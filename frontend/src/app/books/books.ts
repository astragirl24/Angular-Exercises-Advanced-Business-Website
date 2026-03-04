import { Component } from '@angular/core';
import { BookAPIService } from '../myservices/book-apiservice';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-books',
  standalone: false,
  templateUrl: './books.html',
  styleUrl: './books.css',
})
export class Books {
  books:any;
  errMessage:string=''
  constructor(private _service: BookAPIService, private router:Router, private activeRouter: ActivatedRoute){
  this._service.getBooks().subscribe({
  next:(data)=>{this.books=data},
  error:(err)=>{this.errMessage=err}
})
  }
  view_detail(bookId:any){

    alert("Book ID: " + bookId);
    this.router.navigate(['/ex41', bookId]);
  }
  loadBooks() {
    this._service.getBooks().subscribe({
        next: (data) => { this.books = data },
        error: (err) => { console.log(err) }
    });
  }

  // 👇 BỔ SUNG HÀM NÀY 👇
  deleteBook(id: string) {
    if (confirm("Bạn có chắc chắn muốn xóa sách này?")) {
      this._service.deleteBook(id).subscribe({
        next: (res) => {
          alert("Xóa thành công!");
          this.loadBooks(); // Load lại danh sách để thấy nó biến mất
        },
        error: (err) => {
          console.log(err);
          alert("Xóa thất bại!");
        }
      });
    }
  }
}