import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-cookie-test',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './cookie-test.component.html',
  styleUrls: ['./cookie-test.component.css']
})
export class CookieTestComponent {
  result: string = '';

  constructor(private http: HttpClient) { }

  createCookie() {
    this.http.get('http://localhost:3002/create-cookie', { responseType: 'text', withCredentials: true }).subscribe({
      next: (res) => this.result = res,
      error: (err) => this.result = 'Error: ' + err.message
    });
  }

  readCookie() {
    this.http.get('http://localhost:3002/read-cookie', { responseType: 'text', withCredentials: true }).subscribe({
      next: (res) => this.result = res,
      error: (err) => this.result = 'Error: ' + err.message
    });
  }

  createLimitedCookie() {
    this.http.get('http://localhost:3002/create-limited-cookie', { responseType: 'text', withCredentials: true }).subscribe({
      next: (res) => this.result = res,
      error: (err) => this.result = 'Error: ' + err.message
    });
  }

  clearCookie() {
    this.http.get('http://localhost:3002/clear-cookie', { responseType: 'text', withCredentials: true }).subscribe({
      next: (res) => this.result = res,
      error: (err) => this.result = 'Error: ' + err.message
    });
  }
}
