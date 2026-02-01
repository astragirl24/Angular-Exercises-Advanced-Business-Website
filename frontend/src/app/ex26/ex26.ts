import { Component } from '@angular/core';
import { IFakeProduct } from '../myclasses/FakeProduct';
import { FakeProductService } from '../fake-product';

@Component({
  selector: 'app-ex26',
  standalone: false,
  templateUrl: './ex26.html',
  styleUrls: ['./ex26.css'],
})
export class Ex26 {
  products: IFakeProduct[] = []; 
  errMessage: string = '';
  constructor(private _service: FakeProductService) {
    this._service.getFakeProductData().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        this.errMessage = err;
      }
    });
  }
}
