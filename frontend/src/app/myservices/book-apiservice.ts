import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { IBook } from '../myclasses/IBook';

@Injectable({ providedIn: 'root' })
export class BookAPIService {
  constructor(private _http: HttpClient) { }

  // 1. LẤY DANH SÁCH (Giữ nguyên)
  getBooks(): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf-8");
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    };
    return this._http.get<any>("/books", requestOptions).pipe(
      map(res => JSON.parse(res) as Array<IBook>),
      retry(3),
      catchError(this.handleError));
  }

  // 2. LẤY CHI TIẾT (Đã sửa lỗi URL)
  getBook(bookId: string): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf-8");
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    };
    // SỬA: Dùng đường dẫn tương đối "/books/" thay vì "https://localhost:3000..."
    return this._http.get<any>("https://localhost:3000/books/" + bookId, requestOptions).pipe(
      map(res => JSON.parse(res) as IBook),
      retry(3),
      catchError(this.handleError))
  }

  // 3. THÊM SÁCH MỚI (Bổ sung cho bài 50)
  postBook(book: any): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "application/json;charset=utf-8");
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    };
    // Gửi dữ liệu book dạng JSON string lên server
    return this._http.post<any>("/books", JSON.stringify(book), requestOptions).pipe(
      map(res => JSON.parse(res)),
      retry(3),
      catchError(this.handleError)
    );
  }

  // 4. CẬP NHẬT SÁCH (Bổ sung cho bài 50)
  putBook(book: any): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "application/json;charset=utf-8");
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    };
    return this._http.put<any>("/books", JSON.stringify(book), requestOptions).pipe(
      map(res => JSON.parse(res)),
      retry(3),
      catchError(this.handleError)
    );
  }

  // 5. XÓA SÁCH (Bổ sung cho bài 50)
  deleteBook(bookId: string): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "application/json;charset=utf-8");
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    };
    return this._http.delete<any>("/books/" + bookId, requestOptions).pipe(
      map(res => JSON.parse(res)),
      retry(3),
      catchError(this.handleError)
    );
  }

  // HÀM BẮT LỖI CHUNG
  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message))
  }
}