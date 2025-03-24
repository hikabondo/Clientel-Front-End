import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Customer } from '../../model/customer';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-customer',
  imports: [ReactiveFormsModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit{
  @ViewChild('customerModal') model : ElementRef | undefined; 
  customerList : Customer[] =[];
  customerDetails: any;
  service = inject(CustomerService);
  customerForm : FormGroup=new FormGroup({});

  constructor(private formBuilder: FormBuilder){

  }
  ngOnInit(): void {
    this.setFormState();
    this.getCustomers();
  }

  getCustomers(){
    this.service.getAllCustomers().subscribe((response)=>
    {
      console.log(response);
      this.customerList=response;
    });
  }
  
  openModal(){

    const customerModal=document.getElementById('customerModal');

    if(customerModal !=null)
    {
      customerModal.style.display='block';
    }
}

closeModal(){
  //this.setFormState();
  if(this.model !=null){
     this.model.nativeElement.style.display='none';
  }
}

setFormState(){

    this.customerForm= this.formBuilder.group({
    customerID:[0],
    name:['', Validators.required],
    email:['', Validators.required],
    phoneNumber:['', Validators.required]
  });

}

onSubmit(){
  
  if(this.customerForm.invalid){
   alert("Please fill all fields")
   return;
  }

  if(this.customerForm.value.customerID==0){

    this.customerDetails=this.customerForm.value;

    this.service.addCustomer(this.customerDetails).subscribe((response)=>{
      alert("Customer added Sucessfully");
      this.getCustomers();
      this.customerForm.reset();
      this.closeModal();
    })
  }
  else
  {
    this.customerDetails=this.customerForm.value;
    this.service.updateCustomer(this.customerDetails).subscribe((response)=>{
    alert("Customer updated Sucessfully");
    this.getCustomers();
    this.customerForm.reset();
    this.closeModal();
    });
  }
}

onEdit(customer: Customer){
  this.openModal();
  this.customerForm.patchValue(customer);
}

onDelete(customerid:number){

  const canDelete=confirm("Are you sure you want to delete this record");

  if(canDelete){
      this.service.deleteCustomer(customerid).subscribe((response)=>{
      alert("Customer Deleted Succesfully");
      this.getCustomers();
     })
  }
}

applyFilter(e: any) {

  console.log(e.target.value);
  let filterValue = e.target.value.toLowerCase();

  if(filterValue !== '' ) {
    this.customerList=this.customerList.filter((x: { name: any | any[]; })=> x.name.toLowerCase().includes(filterValue))
   } 
   else
   {
    this.getCustomers();
   }
  }
}
