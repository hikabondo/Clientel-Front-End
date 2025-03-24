import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../model/customer';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl="https://localhost:7246/api/Customers";

  constructor() {
   }

  http=inject(HttpClient)

  getAllCustomers(){
    return this.http.get<Customer[]>(this.apiUrl);
  }

  addCustomer(data : any){
   return this.http.post(this.apiUrl,data);
  }

  updateCustomer(customer: Customer){
  return this.http.put(`${this.apiUrl}/${customer.customerID}`,customer);
  }

  deleteCustomer(customerid:number){
  return this.http.delete(`${this.apiUrl}/${customerid}`)
  }

}
