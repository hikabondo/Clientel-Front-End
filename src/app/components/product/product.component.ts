import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../models/product';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-product',
  imports: [ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{
  @ViewChild('productModal') model : ElementRef | undefined; 
  productList : Product[] =[];
  productDetails: any;
  service = inject(ProductService);
  productForm : FormGroup=new FormGroup({});

  constructor(private formBuilder: FormBuilder){

  }
  ngOnInit(): void {
    this.setFormState();
    this.getProducts();
  }

  getProducts(){
    this.service.getAllProducts().subscribe((response)=>
    {
      console.log(response);
      this.productList=response;
    });
  }

  openModal(){

    const productModal=document.getElementById('productModal');

    if(productModal !=null)
    {
      productModal.style.display='block';
    }
}

closeModal(){
  //this.setFormState();
  if(this.model !=null){
     this.model.nativeElement.style.display='none';
  }
}

setFormState(){

  this.productForm= this.formBuilder.group({
  productID:[0],
  name:['', Validators.required],
  description:['', Validators.required],
  price:['', Validators.required]
});

}

onSubmit(){
  
  if(this.productForm.invalid){
   alert("Please fill all fields")
   return;
  }

  if(this.productForm.value.productID==0){

    this.productDetails=this.productForm.value;

    this.service.addProduct(this.productDetails).subscribe((response)=>{
      alert("Product added Sucessfully");
      this.getProducts();
      this.productForm.reset();
      this.closeModal();
    })
  }
  else
  {
    this.productDetails=this.productForm.value;
    this.service.updateProduct(this.productDetails).subscribe((response)=>{
    alert("Product updated Sucessfully");
    this.getProducts();
    this.productForm.reset();
    this.closeModal();
    });
  }
}

onEdit(product: Product){
  this.openModal();
  this.productForm.patchValue(product);
}

onDelete(productid:number){

  const canDelete=confirm("Are you sure you want to delete this record");

  if(canDelete){
      this.service.deleteProduct(productid).subscribe((response)=>{
      alert("Product Deleted Succesfully");
      this.getProducts();
     })
  }
}

applyFilter(e: any) {

  console.log(e.target.value);
  let filterValue = e.target.value.toLowerCase();

  if(filterValue !== '' ) {
    this.productList=this.productList.filter((x: { name: any | any[]; })=> x.name.toLowerCase().includes(filterValue))
   } 
   else
   {
    this.getProducts();
   }
  }

}
