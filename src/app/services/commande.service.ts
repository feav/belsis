import { Injectable } from '@angular/core';
import { ProduitService } from './../services/produit.service';
import {reject} from "q";
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  public items:any;
  public host :string = 'http://belsis.cm/index.php';
  public base : string = "/api/commande/"
  constructor(private http: HttpClient) { 
  	this.items = [];
  }
   getOrderByTable(table_id){
     let httpOptions = {headers: new HttpHeaders({"Content-Type":  "application/json"})};
     let attr :string = "get-by-user";
     if(table_id)
        attr = "get-by-table?table_id="+table_id;
      return new Promise(resolve => {
      this.http.get(this.host+this.base+attr,httpOptions)
        .subscribe(data => {
          resolve(data);
        })
      });
   }
  getCurrentOrder(){
     let httpOptions = {headers: new HttpHeaders({"Content-Type":  "application/json"})};
     let attr :string  = "get-by-user";
      return new Promise(resolve => {
      this.http.get(this.host+this.base+attr,httpOptions)
        .subscribe(data => {
          resolve(data);
        })
      });
  }
  getCommandeById(order_id:number){
     let httpOptions = {headers: new HttpHeaders({"Content-Type":  "application/json"})};
     let attr :string  = "get?order_id="+order_id;
      return new Promise(resolve => {
      this.http.get(this.host+this.base+attr,httpOptions)
        .subscribe(data => {
          resolve(data);
        })
      });
  }
  removeProduct(order_id:number, product_id:number){
     let httpOptions = {headers: new HttpHeaders({"Content-Type":  "application/json"})};
     let attr :string  = "remove-product?order_id="+order_id+"&product_id="+product_id;
      return new Promise(resolve => {
      this.http.get(this.host+this.base+attr,httpOptions)
        .subscribe(data => {
          resolve(data);
        })
      });
  }
  /**
  ** @TODO mettre a jour la commande si un produit existe deja il faut mettre a jour la quantite 
  ** si un produit est indisponible il faut dans le stock il faut le retirer
  **/
  addProductByOrder(order_id:number, prod_id : number,prod_qty : number){
     let httpOptions = {headers: new HttpHeaders({"Content-Type":  "application/json"})};
     let attr :string  = "add";
     let postData = {
            "order_id": order_id,
            "product_id": prod_id,
            "qty": prod_qty
    }
      return new Promise(resolve => {
      this.http.post(this.host+this.base+attr,postData,httpOptions)
        .subscribe(data => {
          resolve(data);
        })
      });
  }
  createOrder(table_id:number, products:any){
     let httpOptions = {headers: new HttpHeaders({"Content-Type":  "application/json"})};
     let attr :string  = "add-many";
     let postData = {
            "order_id": "",
            "table_id": table_id,
            "products_cmd": products
    }
      return new Promise(resolve => {
      this.http.post(this.host+this.base+attr,postData,httpOptions)
        .subscribe(data => {
          resolve(data);
        })
      });
  }
  changeState(order_id,state){
     let httpOptions = {headers: new HttpHeaders({"Content-Type":  "application/json"})};
     let attr :string  = "change-etat?order_id="+order_id+"&etat="+state;
      return new Promise(resolve => {
      this.http.get(this.host+this.base+attr,httpOptions)
        .subscribe(data => {
          resolve(data);
        })
      });
  }
  getProductByOrder(order_id:number, products : Array<any>){
      return new Promise(resolve => {
        resolve({status:200,message:"8 produits one ete ajoutes"});

        })
  }

  deleteOrder(order_id:number){
    return this.changeState(order_id,"trash");
  }
  cashOrder(order_id:number){
    return this.changeState(order_id,"paye");
  }
  readyOrder(order_id:number){
    return this.changeState(order_id,"prete");
  }
  //http://belsis.cm/index.php/api/commande/change-etat      order_id& etat
  prepareOrder(order_id:number){
    return this.changeState(order_id,"en_cours");
  }
}
