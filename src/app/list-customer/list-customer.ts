import { Component } from '@angular/core';

@Component({
  selector: 'app-list-customer',
  standalone: false,
  templateUrl: './list-customer.html',
  styleUrl: './list-customer.css',
})
export class ListCustomer {
 customers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', age: 30, picture: 'https://via.placeholder.com/100' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25, picture: 'https://via.placeholder.com/100' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 35, picture: 'https://via.placeholder.com/100' }
  ];
}
