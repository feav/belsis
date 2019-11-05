import { Injectable } from '@angular/core';
import { Order } from './../models/order.model';
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
  	let order_id = 0;
    let tables = JSON.parse(localStorage.getItem('tables'));

  	if(localStorage.getItem('orders') == null){
  		order_id = 1;
  	}else{
		order_id = JSON.parse(localStorage.getItem('orders')).length + 1;
  	}

  	let order = new Order(order_id, product, quantityOrdered, quantityDelivered);

  	if(localStorage.getItem('orders') != null)
  		this.items = JSON.parse(localStorage.getItem('orders'));

  	this.items.push(order);

  	localStorage.setItem('orders', JSON.stringify(this.items));

  	// Update table
  	if(tableId != null){
  		
      let index = 0;
  		let table = tables.filter((t, i)=>{
        index = i;
        return t.id == tableId 
  		})[0];
      table.orders.push(order_id);
      tables[index] = table;

      localStorage.setItem('tables', JSON.stringify(tables));

  	}

  }

  getOrders(){
  	let orders = [];
  	if(localStorage.getItem('orders') != null)
  		orders = JSON.parse(localStorage.getItem('orders'));
  	return orders;
  }

}
