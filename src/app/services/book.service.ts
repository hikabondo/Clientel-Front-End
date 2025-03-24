import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl="https://localhost:7282/api/LibraryManagement";
  constructor() {

   }

  http=inject(HttpClient)

  getAllBooks(){
    return this.http.get<Book[]>(this.apiUrl);
  }
  addBook(data : any){
   return this.http.post(this.apiUrl,data);
  }
  updateBook(book: Book){
  return this.http.put(`${this.apiUrl}/${book.id}`,book);
  }
  deleteBook(id:number){
  return this.http.delete(`${this.apiUrl}/${id}`)
  }
}
