import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing-module';
import { AppComponent } from './app';
import { CatalogComponent } from './catalog/catalog';
import { NotFound } from './not-found/not-found'; 
import { ListCustomer2 } from './list-customer-2/list-customer-2';
import { ProductDetail } from './product-detail/product-detail';
import { ProductServiceDetail } from './product-service.detail/product-service.detail';
import { ProductServiceEvent } from './product-service.event/product-service.event';
import { CustomerHttpGroup } from './customer-http-group/customer-http-group';
import { provideHttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Books } from './books/books';
@NgModule({
  declarations: [
    AppComponent,
    NotFound,
    ListCustomer2,
    ProductDetail,
    ProductServiceDetail,
    ProductServiceEvent,
    CustomerHttpGroup,
    Books,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    CatalogComponent,
    HttpClientModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }