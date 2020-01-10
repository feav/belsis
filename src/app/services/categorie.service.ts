import { Injectable } from '@angular/core';
import {reject} from "q";
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  public host :string = 'http://belsis.cm/index.php';
  public base : string = "/api/categorie/"
  constructor(private http: HttpClient) { }

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
     let httpOptions = {headers: new HttpHeaders({"Content-Type":  "application/json"})};
      return new Promise(resolve => {
      this.http.get(this.host+this.base+"get-by-shop",httpOptions)
        .subscribe(data => {
          resolve(data);
        })
      });
  }
}
