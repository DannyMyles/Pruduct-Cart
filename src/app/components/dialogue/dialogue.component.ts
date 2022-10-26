import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators, FormArray } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { forbidenNameValidator } from 'src/app/shared/product-validator';

//MatDialogRef will be used to close the dialog after the form is submitted successfully.
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-dialogue',
  templateUrl: './dialogue.component.html',
  styleUrls: ['./dialogue.component.css']
})
export class DialogueComponent implements OnInit {

  freshProduct =["Brand New","Second Hand", "Refubrished",]
  actionBtn:string = "Save"
  productForm!:FormGroup;

  get productName(){
    return this.productForm.get('productName');
  }

  
//Injecting api and MatDialogRef(MatDialogRef will be used to close the form/Dialog after successful submission)
//use the MatDialogRef to close the DialogueComponent
  constructor(
    private fb: FormBuilder, 
    private api: ApiService, 
    private dialogRef:MatDialogRef<DialogueComponent>,
    @Inject(MAT_DIALOG_DATA)public editData:any,
    ) { }

    

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName:['', [Validators.required,
      Validators.minLength(3),forbidenNameValidator(/product/)]],
      category:['', Validators.required],
      freshness: ['',Validators.required],
      datepicker: ['', Validators.required],
      price:['',Validators.required],
      comment: ['', Validators.required],
  })
  if(this.editData){
    this.actionBtn = "Update"
    this.productForm.controls['productName'].setValue(this.editData.productName)
    this.productForm.controls['category'].setValue(this.editData.category)
    this.productForm.controls['freshness'].setValue(this.editData.freshness)
    this.productForm.controls['datepicker'].setValue(this.editData.datepicker)
    this.productForm.controls['price'].setValue(this.editData.price)
    this.productForm.controls['comment'].setValue(this.editData.comment)

  }
}

  
  //Using the imported API to add product
  addProduct(){
   if(!this.editData){
    if(this.productForm.valid){
      this.api.postProduct(this.productForm.value)
      .subscribe({
        next: (res)=>{
          alert('Product add Successfully')
          //resetting the form
          this.productForm.reset();
          // closing the form
          this.dialogRef.close("save");
        },
        error: (err)=>{
          alert('Error adding product')
        }
      })
    }
   }else{
    this.updateProduct()
   }
  }
  updateProduct(){
    this.api.putProduct(this.productForm.value,this.editData.id)
    .subscribe({
      next:(res)=> {
        alert('Product updated successfully')
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert('There was an error Updating the product')
      }
    })
  }

}
