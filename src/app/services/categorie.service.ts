import { Injectable } from '@angular/core';
import {reject} from "q";

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  constructor() { }

  public categories = [
           {
             id:1,
             name:"WHISKY",
             icon:"assets/cat/beer.png",
             total:10,
             color:"#870b3d"
           }, {
             id:1,
             name:"FROMAGE",
             icon:"assets/cat/fromage.png",
             total:10,
             color:"#fdc400"
           }, {
             id:1,
             name:"FRUIT",
             icon:"assets/cat/fruit.png",
             total:10,
             color:"#55ae31"
           },

           {
             id:1,
             name:"BIERE",
             icon:"assets/cat/biere.png",
             total:10,
             color:"#a85f4e"
           }, {
             id:1,
             name:"LEGUME",
             icon:"assets/cat/legume.png",
             total:10,
             color:"#d37f6e"
           }, {
             id:1,
             name:"OEUF",
             icon:"assets/cat/oeuf.png",
             total:10,
             color:"#009bb5"
           }, {
             id:1,
             name:"POISSON",
             icon:"assets/cat/poisson.png",
             total:10,
             color:"#009ee2"
           }, {
             id:1,
             name:"VIANDE",
             icon:"assets/cat/viande.png",
             total:10,
             color:"#e74038"
           }, {
             id:1,
             name:"VIN",
             icon:"assets/cat/vin.png",
             total:10,
             color:"#af0f49"
           }
         ];
   	getAllByUser(){
         	return new Promise(resolve => {
                if (this.categories.length > 0){
                    resolve(this.categories);
				}else {
                	reject('pas de produit pour votre restaurant');
				}

        	})
         }
}
