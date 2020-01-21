import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {reject} from "q";
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { UtilsService } from './utils.service';
import { Product } from './../models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  public HOST_BASE: string = this.utilsService.getHostAddress();

  	private items:any;
    public base:string = "/api/commande/";
    public host:string;
  	public produit = {
		id: '',
		nom: "",
		prix: "",
		stocks: "0",
		quantite: "3",
		url:"../../assets/prod_7.png"
    }

    constructor(private http: HttpClient, private utilsService: UtilsService ) {
         this.host = 'http://belsis.cm/index.php';
    }
     /**
     @TODO frank implement this API
     **/
     getProductByCategory(cat_id){
          let httpOptions = {headers: new HttpHeaders({"Content-Type":  "application/json"})};
        return new Promise(resolve => {
          this.http.get(this.host+"/api/produit/get-by-categorie?cat_id="+cat_id,httpOptions)
            .subscribe(data => {
              resolve(data);
            })
          });
     }
     getProductByOrder(order_id){
          let httpOptions = {headers: new HttpHeaders({"Content-Type":  "application/json"})};
        return new Promise(resolve => {
          this.http.get(this.host+this.base+"get-product-by-order?order_id="+order_id,httpOptions)
            .subscribe(data => {
              resolve(data);
            })
          });
     }
     updateStock(product_id,qty){
          let httpOptions = {headers: new HttpHeaders({"Content-Type":  "application/json"})};
          let operation ="add";
          if(qty<0){
            qty *= -1;
            operation ="reduction";
          }
        return new Promise(resolve => {
          this.http.get(this.host+ "/api/produit/"+"edit-stock?product_id="+product_id+"&qty="+qty+"&operation="+operation,httpOptions)
            .subscribe(data => {
              resolve(data);
            })
          });
     }
    deleteProduct(product_id){
          let httpOptions = {headers: new HttpHeaders({"Content-Type":  "application/json"})};
        return new Promise(resolve => {
          this.http.get(this.host+ "/api/produit/"+"delete?product_id="+product_id,httpOptions)
            .subscribe(data => {
              resolve(data);
            })
          });
     }
     saveProduct(product: any): Observable<any>{
       return this.http.post<any>( `${this.HOST_BASE}/api/produit/add`, product);
     }
     addProduct(id,prix, quantite,restaurant,categorie,nom,description,image){
          let httpOptions = {headers: new HttpHeaders({"Content-Type":  "application/json"})};
          let product = {
            product_id:id,
            prix:prix,
            quantite:quantite,
            restaurant:restaurant,
            categorie:categorie,
            nom:nom,
            description:description,
            image:image
          };
        return new Promise(resolve => {
          this.http.post(this.host+ "/api/produit/add",product,httpOptions)
            .subscribe(data => {
              resolve(data);
            })
          });
     }

}
