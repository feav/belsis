import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  	private items:any;

  	getAll(){
  		return this.items;
  	}
  	constructor() { 
	  	this.items = [
	      {
	        id: 1,
	        nom: "Poulet dg",
	        prix: "7 000",
	        stock: 12,
	        quantite: 3,
	        url:"../../assets/prod_2.jpg"
	      },
	      {
	        id: 2,
	        nom: "Gateau Ananas",
	        prix: "5 000",
	        stock: 64,
	        quantite: 3,
	        url:"../../assets/prod_3.jpg"
	      },
	      {
	        id: 3,
	        nom: "Sauce pistache au gombo",
	        prix: "15 000",
	        stock: 23,
	        quantite: 3,
	        url:"../../assets/prod_4.jpeg"
	      },
	      {
	        id: 4,
	        nom: "Salade de fruits",
	        prix: "15 000",
	        stock: 6,
	        quantite: 3,
	        url:"../../assets/prod_1.png"
	      },
	      {
	        id: 5,
	        nom: "Les lefombos",
	        prix: "1 000",
	        stock: 54,
	        quantite: 3,
	        url:"../../assets/prod_5.jpeg"
	      },
	      {
	        id: 6,
	        nom: "Beignet sucré au blé entier",
	        prix: "3 000",
	        stock: 4,
	        quantite: 3,
	        url:"../../assets/prod_6.jpeg"
	      },
	      {
	        id: 7,
	        nom: "Gâteau ou met de pistache",
	        prix: "1 000",
	        stock: 114,
	        quantite: 3,
	        url:"../../assets/prod_7.png"
	      },
	      {
	        id: 8,
	        nom: "Koki",
	        prix: "3 000",
	        stock: 9,
	        quantite: 3,
	        url:"../../assets/prod_9.jpg"
	      }
	    ];
	}
	randomlly(){
		let rand = [];
		for(let i=0;i<this.items.lenght;i++){
			let choice = Math.floor(Math.random() * 10) + 0;
			if(choice >  5)
				rand.push(this.items[i]);
		}
		return rand;
	}
	filterItems(searchTerm) {
	    return this.items.filter(item => {
	      return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
	    });
	  }
}
