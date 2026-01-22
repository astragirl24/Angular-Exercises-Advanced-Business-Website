import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFound } from './not-found/not-found';
import { ListProduct } from './list-product/list-product';
import { ProductDetail } from './product-detail/product-detail';
import { ProductServiceEvent } from './product-service.event/product-service.event';
import { ProductServiceDetail } from './product-service.detail/product-service.detail';
import { CustomerHttpGroup } from './customer-http-group/customer-http-group';

export const routes: Routes = [
  { path: 'products', component: ListProduct },
  { path: 'sản-phẩm-1/:id', component: ProductDetail },
  { path: 'product-service-event', component: ProductServiceEvent},
  { path: 'product-service-detail/:id', component: ProductServiceDetail}, 
  { path: 'customer-http-group', component: CustomerHttpGroup },
  { path: '**', component: NotFound }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
