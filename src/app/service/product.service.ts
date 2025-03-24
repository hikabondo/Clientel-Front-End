import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

 
  private apiUrl="https://localhost:7208/api/Products";

  constructor() {
   }

  http=inject(HttpClient)

  getAllProducts(){
    return this.http.get<Product[]>(this.apiUrl);
  }

  addProduct(data : any){
   return this.http.post(this.apiUrl,data);
  }

  updateProduct(product: Product){
  return this.http.put(`${this.apiUrl}/${product.productID}`,product);
  }

  deleteProduct(productid:number){
  return this.http.delete(`${this.apiUrl}/${productid}`)
  }
}
