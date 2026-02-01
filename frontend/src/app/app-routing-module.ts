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
import { Ex26 } from './ex26/ex26';
export const routes: Routes = [
  { path: 'sản-phẩm-1/:id', component: ProductDetail },
  { path: 'product-service-event', component: ProductServiceEvent},
  { path: 'product-service-detail/:id', component: ProductServiceDetail}, 
  { path: 'customer-http-group', component: CustomerHttpGroup },
  { path: 'ex39', component: Books},
  { path: 'laptop', component: Laptops},
  { path: 'form', component: Form },
  { path: 'ex26', component: Ex26}, 
  { path: '**', component: NotFound }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
