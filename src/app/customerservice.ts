import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Customerservice {
  customers = [
    { id: 1, name: 'John Doe', age: 30, picture: ' assets/john_doe.jpg' },
    { id: 2, name: 'Jane Smith', age: 25, picture: ' assets/jane_smith.jpg' },
    { id: 3, name: 'Alice Johnson', age: 35, picture: ' assets/alice_johnson.jpg' },
    { id: 4, name: 'Bob Brown', age: 40, picture: ' assets/bob_brown.jpg' },
  ];
  constructor() {}
  get_all_customers() {
    return this.customers;
  }
  get_customer_detail(id: number) 
  { 
  let c = this.customers.find(x => x.id === id);
  return c;
  }
}