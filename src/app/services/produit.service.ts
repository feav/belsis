import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  	private items:any;

  	getAll(){
  		return this.items;
  	}

  	public save(produit){

  	}

  	public update(produit){
  		
  	}

	public getAllPlats():Array<any>{

		return [
		{
			id: 10,
			url: "../../assets/prod_2.jpg",
			nom: "Couscous Foleré",
			categories: [
				"Céréal", "Légume", "Fruit"
			],
			composition: [
				{
					id: 1,
					nom : "Farine mais",
					quantite: 2
				},
				{
					id: 2,
					nom : "Feuille d'oseille",
					quantite: 10
				},
				{
					id: 3,
					nom : "pattes d'arrachide",
					quantite : 2
				}
			],
			prix: 2000
		},
		{
			id: 10,
			url: "../../assets/prod_2.jpg",
			nom: "Couscous Foleré",
			categories: [
				"Céréal", "Légume", "Fruit"
			],
			composition: [
				{
					id: 1,
					nom : "Farine mais",
					quantite: 2
				},
				{
					id: 2,
					nom : "Feuille d'oseille",
					quantite: 10
				},
				{
					id: 3,
					nom : "pattes d'arrachide",
					quantite : 2
				}
			],
			prix: 2000
		},
		{
			id: 10,
			url: "../../assets/prod_2.jpg",
			nom: "Couscous Foleré",
			categories: [
				"Céréal", "Légume", "Fruit"
			],
			composition: [
				{
					id: 1,
					nom : "Farine mais",
					quantite: 2
				},
				{
					id: 2,
					nom : "Feuille d'oseille",
					quantite: 10
				},
				{
					id: 3,
					nom : "pattes d'arrachide",
					quantite : 2
				}
			],
			prix: 2000
		},
		{
			id: 10,
			url: "../../assets/prod_2.jpg",
			nom: "Couscous Foleré",
			categories: [
				"Céréal", "Légume", "Fruit"
			],
			composition: [
				{
					id: 1,
					nom : "Farine mais",
					quantite: 2
				},
				{
					id: 2,
					nom : "Feuille d'oseille",
					quantite: 10
				},
				{
					id: 3,
					nom : "pattes d'arrachide",
					quantite : 2
				}
			],
			prix: 2000
		}
		];	
	}

	public getAllEntrees():Array<any>{
		return [];
	}

	public getAllBoissons():Array<any>{
		return [
			{
				id: 12,
				url: "../../assets/prod_2.jpg",
				nom: "33 Export",
				prix: "700"
			},
			{
				id: 10,
				url: "../../assets/prod_2.jpg",
				nom: "Guiness",
				prix: "1000"
			},
			{
				id: 11,
				url: "../../assets/prod_2.jpg",
				nom: "Jus Ananas",
				prix: "1000"
			},
			{
				id: 19,
				url: "../../assets/prod_2.jpg",
				nom: "Jus Djino",
				prix: "1000"
			}
		];
	}

	public getAllDessert():Array<any>{
		return [];
	}

  	constructor() { 
	  	this.items = [
	      {
	        id: 1,
	        nom: "Poulet dg",
	        prix: "7000",
	        stock: 12,
	        quantite: 0,
	        categories: [
	        	"Legume", "Céréal", "Viande", "Poisson"
	        ],
	        url:"../../assets/prod_2.jpg",
	      },
	      {
	        id: 2,
	        nom: "Gateau Ananas",
	        prix: "5000",
	        stock: 64,
	        quantite: 0,
	        categories: [
	        	"Legume", "Céréal", "Viande", "Poisson"
	        ],
	        url:"../../assets/prod_3.jpg"
	      },
	      {
	        id: 3,
	        nom: "Sauce pistache au gombo",
	        prix: "15 000",
	        stock: 23,
	        quantite: 0,
	        categories: [
	        	"Legume", "Céréal", "Viande", "Poisson"
	        ],
	        url:"../../assets/prod_4.jpeg"
	      },
	      {
	        id: 4,
	        nom: "Salade de fruits",
	        prix: "15000",
	        stock: 6,
	        quantite: 0,
	        categories: [
	        	"Legume", "Céréal", "Viande", "Poisson"
	        ],
	        url:"../../assets/prod_1.png"
	      },
	      {
	        id: 5,
	        nom: "Les lefombos",
	        prix: "1000",
	        stock: 54,
	        quantite: 0,
	        categories: [
	        	"Legume", "Céréal", "Viande", "Poisson"
	        ],
	        url:"../../assets/prod_5.jpeg"
	      },
	      {
	        id: 6,
	        nom: "Beignet sucré au blé entier",
	        prix: "3000",
	        stock: 4,
	        quantite: 0,
	        categories: [
	        	"Legume", "Céréal", "Viande", "Poisson"
	        ],
	        url:"../../assets/prod_6.jpeg"
	      },
	      {
	        id: 7,
	        nom: "Gâteau ou met de pistache",
	        prix: "1000",
	        stock: 114,
	        quantite: 0,
	        categories: [
	        	"Legume", "Céréal", "Viande", "Poisson"
	        ],
	        url:"../../assets/prod_7.png"
	      },
	      {
	        id: 8,
	        nom: "Koki",
	        prix: "3000",
	        stock: 9,
	        quantite: 0,
	        categories: [
	        	"Legume", "Céréal", "Viande", "Poisson"
	        ],
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

	getProduct(id){
		console.log(this.items.filter(item=>{item.id == id})[0]);
		return this.items.filter(item=>{item.id == id})[0];
	}
}
