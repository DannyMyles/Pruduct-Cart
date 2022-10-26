import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogueComponent } from './components/dialogue/dialogue.component';
import { ApiService } from './services/api.service';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AngularCrud';
  getProduct :any;

  displayedColumns: string[] = ['productName', 'category', 'freshness', 'datepicker','price','comment','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //Injectig matdialog
  constructor(private dialog: MatDialog, private api:ApiService) {}  
  ngOnInit(): void {
    this.getAllProducts();
  }

  // Created a function that will be called when the AddProduct button is clicked, We need to open the DialogueComponent when the AddProduct button is clicked.
  openDialog() {
    this.dialog.open(DialogueComponent, {
      width:'30%'
    }).afterClosed().subscribe(value => {
      if (value === 'update'){
        this.getAllProducts();
      }
    })
  }

  //Creating a function will get all product in the database and display them in the homepage
  //Inject the API (Sort Product done here also)
  getAllProducts() {
    this.api.getProduct()
    .subscribe({
      next:(res)=> {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort=this.sort;
      },
      error:(err)=> {
        alert('Error while getting all products');
      }
    })
  }

  //Filter
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

 
// On the click of the edit button, we want to open the dialog form for editing
  editProduct(row:any){
    this.dialog.open(DialogueComponent, {
      width:'30%',
      data:row
    }).afterClosed().subscribe(values=>{
      if(values === 'save'){
        this.getAllProducts();
      }
    })
  }
  deleteProduct(id:number){
    this.api.deleteProduct(id)
    .subscribe({
      next: (res)=>{
        alert('Product deleted successfully')
        this.getAllProducts();
      },
      error: ()=>{
        alert('Error while deleting record!!')
      }

    })
  }
}

