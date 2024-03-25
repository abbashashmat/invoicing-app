import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateInvoiceComponent } from './components/invoice/create-invoice/create-invoice.component';
import { InvoiceListsComponent } from './components/invoice/invoice-lists/invoice-lists.component';
import { EditInvoiceComponent } from './components/invoice/edit-invoice/edit-invoice.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/auth/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InvoiceItemComponent } from './components/invoice/invoice-item/invoice-item.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateInvoiceComponent,
    InvoiceListsComponent,
    EditInvoiceComponent,
    LoginComponent,
    InvoiceItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
