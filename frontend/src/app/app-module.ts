import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
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
import { Laptops } from './laptops/laptop/laptop'
import { Form } from './form/form';
import { Ex26 } from './ex26/ex26';
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
    Laptops,
    Form,
    Ex26,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CatalogComponent,
    HttpClientModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }