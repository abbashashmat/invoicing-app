import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserRoles } from 'src/app/enums/user-roles.enum';
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-invoice-item',
  templateUrl: './invoice-item.component.html',
  styleUrls: ['./invoice-item.component.scss']
})
export class InvoiceItemComponent {
  @Input() invoice: any;
  invoices: any = []

  userRoles = UserRoles;
  user!: User

  constructor(private authService: AuthService, private router: Router) {
    console.log('Invoice item:-', this.invoice)
    this.authService.getUsers().subscribe(users => {
      this.user = users.find((u: any) => u.id == localStorage.getItem('userId'));
    })
  }

  editInvoice(id: string): void {
    this.router.navigate(['/create_invoice'], { state: { id } });
  }

  deleteInvoice(id: string) {
    localStorage.getItem('invoices')
    if (localStorage.getItem('invoices')) {
      let data = localStorage.getItem('invoices')
      data ? this.invoices = JSON.parse(data) : []
      console.log('invoices:-', this.invoices)
    }
    localStorage.removeItem('invoices')
    let del_invoice = this.invoices.find((x: any) => x.id == id)
    const index = this.invoices.indexOf(del_invoice);
    if (index !== -1) {
      this.invoices.splice(index, 1);
    }
    localStorage.setItem('invoices', JSON.stringify(this.invoices))
    alert('Invoice Deleted Successfully!')
    location.reload()
  }
}
