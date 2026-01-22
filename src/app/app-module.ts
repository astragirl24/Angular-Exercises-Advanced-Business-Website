import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing-module';
import { AppComponent } from './app';
import { CatalogComponent } from './catalog/catalog';
import { NotFound } from './not-found/not-found'; 
import { ListCustomer2 } from './list-customer-2/list-customer-2';
import { ListProduct } from './list-product/list-product';
import { ProductDetail } from './product-detail/product-detail';
import { ProductServiceEvent } from './product-service.event/product-service.event';
import { ProductServiceDetail } from './product-service.detail/product-service.detail';

@NgModule({
  declarations: [
    AppComponent,
    NotFound,
    ListCustomer2,
    ListProduct,
    ProductDetail,
    ProductServiceEvent,
    ProductServiceDetail,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    CatalogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }