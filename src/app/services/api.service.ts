import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //This is where our data will be stored(posted)
  private _url: string = "http://localhost:3000/ProductList/"

  // Injecting http remember to add the module array
  constructor(private http :HttpClient) { }

  //Post API request
  postProduct(data:object){
    return this.http.post<any>(this._url,data)
  }
//Get API request
  getProduct(){
    return this.http.get<any>(this._url);
  }
  
  //Pust Product
  putProduct(data:any, id:number){
    return this.http.put<any>(this._url +id,data)
  }
  //Delete Product
  deleteProduct(id:number){
    return this.http.delete<any>(this._url +id)
}
}
 