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
   	getAllByUser(){
     let httpOptions = {headers: new HttpHeaders({"Content-Type":  "application/json"})};
      return new Promise(resolve => {
      this.http.get(this.host+this.base+"get-by-shop",httpOptions)
        .subscribe(data => {
          resolve(data);
        })
      });
  }
  addCategorie(cat_id,cat_name,description,image){
        let httpOptions = {headers: new HttpHeaders({"Content-Type":  "application/json"})};
          let categorie = {
            categorie_id:cat_id,
            nom:cat_name,
            description:description,
            image:image
          };
        return new Promise(resolve => {
          this.http.post(this.host+ this.base+"add",categorie,httpOptions)
            .subscribe(data => {
              resolve(data);
            })
          });
  }
}
