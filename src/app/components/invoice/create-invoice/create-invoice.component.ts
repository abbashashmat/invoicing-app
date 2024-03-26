import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from 'src/app/services/invoice.service';
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
  @Output() hideShowComponent = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private itemService: ItemService,
    private route: ActivatedRoute,
    private invoiceService: InvoiceService) {
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
      this.invoices = this.invoiceService.getDataFromLocalStorage()
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
      this.invoices = this.invoiceService.getDataFromLocalStorage()
      this.invoiceService.removeFromLocalStorage()
      Object.assign(this.invoiceForm.value, { id: this.generateRandomKey() })
      let item = this.items.find((u: any) => u.id === Number(this.selectedItem));
      Object.assign(this.invoiceForm.value, { item: item })
      this.invoices.push(this.invoiceForm.value)
      let saveData = this.invoiceService.svaeToLocalStorage(this.invoices)
      console.log('All invoices:-', this.invoices);
      if (saveData) alert('Invoice created successfully!')
      this.hideShowComponent.emit();
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
      this.invoiceService.removeFromLocalStorage()
      Object.assign(this.invoiceForm.value, { id: this.invoiceID })
      let item = this.items.find((u: any) => u.id === Number(this.selectedItem));
      Object.assign(this.invoiceForm.value, { item: item })
      this.invoices.push(this.invoiceForm.value)
      let updateData = this.invoiceService.updateDataInLocalStorage(this.invoices)
      console.log('All invoices:-', this.invoices);
      if (updateData) alert('Invoice updated successfully!')
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
