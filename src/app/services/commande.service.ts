import { Injectable } from '@angular/core';
import { ProduitService } from './../services/produit.service';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  public items:any;
  constructor() { 
  	this.items = [];
  }

  addOrder(product, quantityOrdered, quantityDelivered, tableId=null){

  }

  saveCommande(panier:Array<any>, table){
    
  }

  getOrders(){
  	let orders = [];
  	if(localStorage.getItem('orders') != null)
  		orders = JSON.parse(localStorage.getItem('orders'));
  	return orders;
  }

}
