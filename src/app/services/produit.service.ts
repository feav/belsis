import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {reject} from "q";

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  	private items:any;
  	public produit = {
		id: '',
		nom: "",
		prix: "",
		stocks: "0",
		quantite: "3",
		url:"../../assets/prod_7.png"
    }

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

     /**
     @TODO frank implement this API
     **/
     getProductByCategory(cat_id){
     	return new Promise(resolve => {
                if (this.products.length > 0){
                    resolve(this.products);
				}else {
                	reject('pas de produit pour votre restaurant');
				}

        })
     }

}
