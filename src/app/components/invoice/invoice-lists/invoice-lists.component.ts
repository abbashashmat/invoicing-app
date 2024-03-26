
import { Component } from '@angular/core';
import { UserRoles } from 'src/app/enums/user-roles.enum';
import { User } from '../../../interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

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

  constructor(private authService: AuthService, private router: Router) {
    localStorage.getItem('invoices')
    if (localStorage.getItem('invoices')) {
      let data = localStorage.getItem('invoices')
      data ? this.invoices = JSON.parse(data) : []
      console.log('invoices:-', this.invoices)
      if (this.invoices.length) this.showList = true
    }

    this.authService.getUsers().subscribe(users => {
      this.user = users.find((u: any) => u.id == localStorage.getItem('userId'));
    })
  }

  logout() {
    localStorage.removeItem('userId')
    location.reload()
  }
}
