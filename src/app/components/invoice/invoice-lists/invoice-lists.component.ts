
import { Component } from '@angular/core';
import { UserRoles } from 'src/app/enums/user-roles.enum';
import { User } from '../../../interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-invoice-lists',
  templateUrl: './invoice-lists.component.html',
  styleUrls: ['./invoice-lists.component.scss']
})
export class InvoiceListsComponent {

  showForm: boolean = false
  showList: boolean = false
  invoices: any = []
  user!: User
  childVisible: boolean = true;

  constructor(private authService: AuthService, private router: Router, private invoiceService: InvoiceService) {
    this.getAllInvoices()
    this.authService.getUsers().subscribe(users => {
      this.user = users.find((u: any) => u.id == localStorage.getItem('userId'));
    })
  }

  getAllInvoices() {
    localStorage.getItem('invoices')
    if (localStorage.getItem('invoices')) {
      this.invoices = this.invoiceService.getDataFromLocalStorage()
      if (this.invoices.length) this.showList = true
    }
  }

  hideChild() {
    this.showForm = false
    this.getAllInvoices()
  }

  logout() {
    localStorage.removeItem('userId')
    location.reload()
  }
}
