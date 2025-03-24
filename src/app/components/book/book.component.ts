import { Component, ElementRef, OnInit, ViewChild, inject, viewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book',
  imports: [ReactiveFormsModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent implements OnInit {
  @ViewChild('bookModal') model : ElementRef | undefined; 
  bookList : Book[] =[];
  bookDetails: any;
  service=inject(BookService);
  bookForm : FormGroup=new FormGroup({});

  constructor(private formBuilder: FormBuilder){

  }
  ngOnInit(): void {
    this.setFormState();
    this.getBooks();
  }

  getBooks(){
    this.service.getAllBooks().subscribe((response)=>
    {
      console.log(response);
      this.bookList=response;
    });
  }
  openModal(){
      const bookModal=document.getElementById('bookModal');

      if(bookModal !=null)
      {
        bookModal.style.display='block';
      }
  }
  closeModal(){
    //this.setFormState();

    if(this.model !=null){
       this.model.nativeElement.style.display='none';
    }

  }
  setFormState(){
    this.bookForm= this.formBuilder.group({
      id:[0],
      title:['', Validators.required],
      author:['', Validators.required],
      isbn:['', Validators.required],
      publicationYear:['', Validators.required]
    });
  }
  onSubmit(){
   
    if(this.bookForm.invalid){
     alert("Please fill all fields")
     return;
    }
    if(this.bookForm.value.id==0){

      this.bookDetails=this.bookForm.value;
      console.log( this.bookDetails);
      this.service.addBook(this.bookDetails).subscribe((response)=>{
        alert("Book added Sucessfully");
        this.getBooks();
        this.bookForm.reset();
        this.closeModal();
      })
    }
    else
    {
    this.bookDetails=this.bookForm.value;
    this.service.updateBook(this.bookDetails).subscribe((response)=>{
      alert("Book updated Sucessfully");
      this.getBooks();
      this.bookForm.reset();
      this.closeModal();
    })
    }
    
  }
  onEdit(book: Book){
    this.openModal();
    this.bookForm.patchValue(book);
  }
  onDelete(id:number){
    const canDelete=confirm("Are you sure you want to delete this record");
    if(canDelete){
      this.service.deleteBook(id).subscribe((response)=>{
        alert("Book Deleted Succesfully");
        this.getBooks();
       })
    }
  }
  applyFilter(e: any) {
    console.log(e.target.value);
    let filterValue = e.target.value.toLowerCase();
    if(filterValue !== '' ) {
      this.bookList=this.bookList.filter((x: { title: any | any[]; })=> x.title.toLowerCase().includes(filterValue))
     } 
     else
     {
      this.getBooks();
     }
    }
}
