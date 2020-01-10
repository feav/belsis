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
  public commandes = [
      {
        id:1,
        etat: 1,
        name: "Tarte au Fruit",
        price: Math.floor(Math.random() * 1000) + 1000,
        table: "Table 1",
        icon:'refresh',
        rotate:true
      },{
        id:2,
        etat: 2,
        name: "Tarte a la paume",
        price: Math.floor(Math.random() * 1000) + 1000,
        table:"Table 3",
        icon:'trash',
        rotate:false
      },{
        id:3,
        etat: 2,
        name: "Tarte a la prune",
        price: Math.floor(Math.random() * 1000) + 1000,
        table:"Table 6",
        icon:'checkmark',
        rotate:false
      },
      {
        id:4,
        etat: -1,
        name: "Tarte au Fruit",
        price: Math.floor(Math.random() * 1000) + 1000,
        table: "Table 8",
        icon:'checkmark',
        rotate:false
      },{
        id:5,
        etat: 1,
        name: "Tarte a la paume",
        price: Math.floor(Math.random() * 1000) + 1000,
        table:"Table 3",
        icon:'trash',
        rotate:false
      },{
        id:6,
        etat: 2,
        name: "Tarte a la prune",
        price: Math.floor(Math.random() * 1000) + 1000,
        table:"Table 4",
        icon:'refresh',
        rotate:true
      }
    ];
    public products : Array<any> = [
           {
             id:1,
             name:"WHISKY",
             icon:"https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
             price:Math.floor(Math.random() * 100000) + 1,
             qty:0,
             color:"#870b3d",
             total:5
           }, {
             id:2,
             name:"PIZZA PROMAGE",
             icon:"https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&w=1000&q=80",
             price:Math.floor(Math.random() * 100000) + 1,
             qty:0,
             total:2
           }, {
             id:3,
             name:"PIZZA 2 SAISONS",
             icon:"https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
             price:Math.floor(Math.random() * 100000) + 1,
             qty:0,
             total:1
           },

           {
             id:4,
             name:"PIZZA 3 SAISONS",
             icon:"https://images.unsplash.com/photo-1571066811602-716837d681de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
             price:Math.floor(Math.random() * 100000) + 1,
             qty:0,
             total:0
           }, {
             id:5,
             name:"PIZZA MERGAISE",
             icon:"https://images.unsplash.com/photo-1520201163981-8cc95007dd2a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
             price:Math.floor(Math.random() * 100000) + 1,
             qty:0,
             total:5
           }, {
             id:6,
             name:"PIZZA BOUL",
             icon:"https://images.unsplash.com/photo-1544982503-9f984c14501a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
             price:Math.floor(Math.random() * 100000) + 1,
             qty:0,
             total:0
           }, {
             id:7,
             name:"PIZZA RTU",
             icon:"https://images.unsplash.com/photo-1506354666786-959d6d497f1a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
             price:Math.floor(Math.random() * 100000) + 1,
             qty:0,
             total:0
           }
         ];
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
       return new Promise(resolve => {
                if (this.commandes.length > 0){
                    resolve(this.commandes);
        }else {
                  reject('pas de produit pour votre restaurant');
        }

        })
  }
  deleteOrder(order_id:number){
    return new Promise(resolve => {
        resolve({status:200,message:"La commande a bel et bien ete supprimer"});

        })
  }
  getCommandeById(id:number){
       return new Promise(resolve => {
                if (this.products.length > 0){
                    resolve(this.products);
        }else {
                  reject('pas de produit pour votre restaurant');
        }

        })
  }
  removeProduct(order_id:number, product_id:number){
    return new Promise(resolve => {
        resolve({status:200,message:"3 produits ont ete supprimes"});

        })
  }
  /**
  ** @TODO mettre a jour la commande si un produit existe deja il faut mettre a jour la quantite 
  ** si un produit est indisponible il faut dans le stock il faut le retirer
  **/
  addProductByOrder(order_id:number, products : Array<any>){
      return new Promise(resolve => {
        resolve({status:200,message:"8 produits one ete ajoutes"});

        })
  }
  getProductByOrder(order_id:number, products : Array<any>){
      return new Promise(resolve => {
        resolve({status:200,message:"8 produits one ete ajoutes"});

        })
  }
  cashOrder(order_id:number){
      return new Promise(resolve => {
        resolve({status:200,message:"Commande encaissee"});

        })
  }
  prepareOrder(order_id:number){
      return new Promise(resolve => {
        resolve({status:200,message:"Commande encaissee"});

        })
  }
}
