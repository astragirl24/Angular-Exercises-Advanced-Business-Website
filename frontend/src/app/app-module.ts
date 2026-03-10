import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
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
import { Ex27 } from './ex27/ex27';
import { BookDetail } from './book-detail/book-detail';
import { BookNew } from './book-new/book-new';
import { BookEdit } from './book-edit/book-edit';
import { RouterModule } from '@angular/router';
import { FashionComponent } from './fashion/fashion';
import { Login } from './login/login';
import { MomoPayment } from './momo-payment/momo-payment';
import { FashionDetailComponent } from './fashion-detail/fashion-detail';
@NgModule({
  declarations: [
    App,
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
    Ex27,
    BookDetail,
    BookNew,
    BookEdit
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CatalogComponent,
    FashionComponent,
    Login,
    MomoPayment,
    FashionDetailComponent,
    HttpClientModule
  ],
  bootstrap: [App]
})
export class AppModule { }