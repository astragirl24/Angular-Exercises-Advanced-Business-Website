import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFound } from './not-found/not-found';
import { ProductDetail } from './product-detail/product-detail';
import { ProductServiceEvent } from './product-service.event/product-service.event';
import { ProductServiceDetail } from './product-service.detail/product-service.detail';
import { CustomerHttpGroup } from './customer-http-group/customer-http-group';
import { FakeProduct } from './fake-product/fake-product';
import { Books } from './books/books';
export const routes: Routes = [
  { path: 'sản-phẩm-1/:id', component: ProductDetail },
  { path: 'product-service-event', component: ProductServiceEvent},
  { path: 'product-service-detail/:id', component: ProductServiceDetail}, 
  { path: 'customer-http-group', component: CustomerHttpGroup },
  { path: 'ex26', component: FakeProduct}, 
  { path: 'ex39', component: Books},
  { path: '**', component: NotFound }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
