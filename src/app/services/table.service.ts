import { Injectable } from '@angular/core';
import {reject} from 'q';

@Injectable({
  providedIn: 'root'
})
export class TableService {
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
  constructor() { }

  getAllOfMyShop(){

       return new Promise(resolve => {
                if (this.tables.length > 0){
                    resolve(this.tables);
        }else {
                  reject('pas de produit pour votre restaurant');
        }

        })
  }
}
