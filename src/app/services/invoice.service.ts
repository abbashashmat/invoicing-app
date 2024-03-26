import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  invoices: any = []

  constructor() { }

  getDataFromLocalStorage() {
    let data = localStorage.getItem('invoices')
    data ? this.invoices = JSON.parse(data) : []
    console.log('invoices:-', this.invoices)
    return this.invoices
  }

  svaeToLocalStorage(data: any) {
    localStorage.setItem('invoices', JSON.stringify(data))
    return true
  }

  removeFromLocalStorage() {
    return localStorage.removeItem('invoices')
  }

  updateDataInLocalStorage(data: any) {
    localStorage.setItem('invoices', JSON.stringify(data))
    return true
  }
}
