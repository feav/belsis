import { Injectable } from '@angular/core';
import {reject} from 'q';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class TableService {
	public base:string = "/api/table/";
	public host:string;
	public tables : Array<any> = [
		{
			id: 1,
			name:"Table 1",
			description: "Alle droite",
			commandes : 2
		},
		{
			id: 2,
			name:"Table 2",
			description: "Alle gauche",
			commandes : 5
		},
		{
			id: 3,
			name:"Table 3",
			description: "Alle gauche",
			commandes : 0
		},
		{
			id: 4,
			name:"Table 4",
			description: "Alle gauche",
			commandes : 0
		}
	];
    constructor(private http: HttpClient,private nativeStorage:NativeStorage) {
    	 // this.host = localStorage.getItem('host');
    	 this.host = 'http://belsis.cm/index.php';
    }
  	getAllOfMyShop(){
  		let httpOptions = {headers: new HttpHeaders({"Content-Type":  "application/json"})};
	    return new Promise(resolve => {
		  this.http.get(this.host+this.base+"get-by-shop",httpOptions)
		    .subscribe(data => {
		      resolve(data);
		    })
		  });
	}

}
