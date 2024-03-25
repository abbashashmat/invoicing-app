import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.scss']
})
export class CreateInvoiceComponent {

  invoiceForm: FormGroup;
  invoices: any = []
  items: any = []
  invoiceID!: string
  updatedInvoice: any
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  selectedItem: any

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private itemService: ItemService,
    private route: ActivatedRoute) {
    this.invoiceForm = this.formBuilder.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      paymentStatus: ['pending', Validators.required],
      paymentType: ['cash', Validators.required],
    });

    this.itemService.getItems().subscribe((res) => {
      this.items = res
    })

  }

  ngOnInit(): void {
    this.invoiceID = history.state.id;
    console.log('Received ID:', this.invoiceID)
    if (this.invoiceID) {
      let data = localStorage.getItem('invoices')
      data ? this.invoices = JSON.parse(data) : []
      console.log('invoices:-', this.invoices)
      this.updatedInvoice = this.invoices.find((u: any) => u.id === this.invoiceID);
      this.invoiceForm.patchValue({
        name: this.updatedInvoice.name,
        quantity: this.updatedInvoice.quantity,
        price: this.updatedInvoice.price,
        paymentStatus: this.updatedInvoice.paymentStatus,
        paymentType: this.updatedInvoice.paymentType,
      })
      this.selectedItem = this.updatedInvoice.selectedItem
    }
  }

  onSubmit(): void {
    if (this.invoiceForm.invalid) {
      return
    }

    if (this.invoiceForm.valid) {
      let data = localStorage.getItem('invoices')
      data ? this.invoices = JSON.parse(data) : []
      console.log('invoices:-', this.invoices)
      localStorage.removeItem('invoices')
      Object.assign(this.invoiceForm.value, { id: this.generateRandomKey() })
      let item = this.items.find((u: any) => u.id === Number(this.selectedItem));
      Object.assign(this.invoiceForm.value, { item: item })
      this.invoices.push(this.invoiceForm.value)
      localStorage.setItem('invoices', JSON.stringify(this.invoices))
      console.log('All invoices:-', this.invoices);
      this.router.navigate(['/']);
    }
  }

  update() {
    const index = this.invoices.indexOf(this.updatedInvoice);
    if (index !== -1) {
      this.invoices.splice(index, 1);
    }
    if (this.invoiceForm.invalid) {
      return
    }

    if (this.invoiceForm.valid) {
      localStorage.removeItem('invoices')
      Object.assign(this.invoiceForm.value, { id: this.generateRandomKey() })
      this.invoices.push(this.invoiceForm.value)
      localStorage.setItem('invoices', JSON.stringify(this.invoices))
      console.log('All invoices:-', this.invoices);
      this.router.navigate(['/']);
    }
  }

  generateRandomKey() {
    const randomIndex = Math.floor(Math.random() * this.characters.length);
    return randomIndex;
  }

  onSelectionChange(eve: any) {
    console.log('Selected items:', this.invoiceForm.get('selectedItems'));
  }
}
