import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFound } from './not-found/not-found';
import { ProductDetail } from './product-detail/product-detail';
import { ProductServiceEvent } from './product-service.event/product-service.event';
import { ProductServiceDetail } from './product-service.detail/product-service.detail';
import { CustomerHttpGroup } from './customer-http-group/customer-http-group';
import { Books } from './books/books';
import { Laptops } from './laptops/laptop/laptop'
import { Form } from './form/form'
import { Ex26 } from './ex26/ex26'
import { Ex27 } from './ex27/ex27'
import { BookDetail } from './book-detail/book-detail';
import { BookNew } from './book-new/book-new';
import { BookEdit } from './book-edit/book-edit';
import { FashionComponent } from './fashion/fashion';
import { MomoPayment } from './momo-payment/momo-payment';
import { Login } from './login/login';
import { FashionDetailComponent } from './fashion-detail/fashion-detail';
import { CookieTestComponent } from './cookie-test/cookie-test.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

export const routes: Routes = [
  { path: 'sản-phẩm-1/:id', component: ProductDetail },
  { path: 'product-service-event', component: ProductServiceEvent },
  { path: 'product-service-detail/:id', component: ProductServiceDetail },
  { path: 'customer-http-group', component: CustomerHttpGroup },
  { path: 'thoi-trang', component: FashionComponent },
  { path: 'ex39', component: Books },
  { path: 'laptop', component: Laptops },
  { path: 'form', component: Form },
  { path: 'ex26', component: Ex26 },
  { path: 'ex27', component: Ex27 },
  { path: 'ex41', component: BookDetail },
  { path: 'ex41/:id', component: BookDetail },
  { path: 'books/new', component: BookNew },
  { path: 'books/edit/:id', component: BookEdit },
  { path: 'momo', component: MomoPayment },
  { path: 'dang-nhap', component: Login },
  { path: 'fashion-detail/:id', component: FashionDetailComponent },
  { path: 'cookie-test', component: CookieTestComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  //{ path: '**', component: NotFound }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
