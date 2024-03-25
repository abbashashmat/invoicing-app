import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { InvoiceListsComponent } from './components/invoice/invoice-lists/invoice-lists.component';
import { CreateInvoiceComponent } from './components/invoice/create-invoice/create-invoice.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', component: InvoiceListsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'create_invoice', component: CreateInvoiceComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
