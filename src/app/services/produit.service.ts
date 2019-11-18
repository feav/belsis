import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProduitModel } from '../models/produit.model';
import { PanierModel } from '../models/panier.model';
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

  	getAll(){
  		return this.items;
  	}


    createNewProduct(record) {
        //return this.firestore.collection('Students').add(record);
        localStorage.setItem('2',this.produit['id']);
        localStorage.setItem('nom',this.produit['nom']);
        localStorage.setItem('prix',this.produit['prix']);
        localStorage.setItem('stock',this.produit['stocks']);
        localStorage.setItem('quantite',this.produit['quantite']);
    }

    pushProduct(id,name, pu,qte,restoID,catID,url){
  		return new ProduitModel(id,name, pu,qte,restoID,catID,url);
	}
	pushPanier(produitId,qte,pu,restoId,tatbleID){
  		return new PanierModel(produitId,qte,pu,restoId,tatbleID);
	}

    public lastId():any{
        let storage = localStorage.getItem('products');
        let  storages = JSON.parse(storage);
        return storages.length;
    }

    readProducts() {
        //return this.firestore.collection('Produit').snapshotChanges();
    }

    updatePruduct(recordID,record){
        //this.firestore.doc('Students/' + recordID).update(record);
    }

    deleteProduct(record_id) {
        //this.firestore.doc('Students/' + record_id).delete();
    }
    async allProduct():Promise<any>{
        return new Promise(resolve => {
            let datas = localStorage.getItem('produits');
            datas = JSON.parse(datas);
            //console.log(produits);
            resolve(datas);
        })
    }
    async allCategoris():Promise<any>{
        return new Promise(resolve => {
            let datas = localStorage.getItem('categories');
            datas = JSON.parse(datas);
            //console.log(produits);
            resolve(datas);
        })
    }
    allCategoris2(){
            let datas = localStorage.getItem('categories');
              return JSON.parse(datas);
    }
    async ProductResto():Promise<any>{
        return new Promise(resolve => {
            let produit = localStorage.getItem('products');
            let restoId = this.curentUserInfo()[0].restoId;
            let produitResto = new Array();
            //console.log(restoId);
            let conv = JSON.parse(produit);
                 //console.log(produit);
                for (let i = 0; i < conv.length;i++){
                    if (conv[i].restoId == restoId){

						produitResto.push( conv[i]);
                        //resolve(produit);
                    }
                }
                if (produitResto.length > 0){
                    resolve(produitResto);
				}else {
                	reject('pas de produit pour votre restaurant');
				}

        })
    }
    curentUserInfo(){
        let curentcy = localStorage.getItem('userconnected');
        return JSON.parse(curentcy);
    }
    async Product(id):Promise<any>{
        return new Promise(resolve => {
            let produit = localStorage.getItem('produits');
            let conv = JSON.parse(produit);
            if (id !==null ){
                for (let i = 0; i < conv.length;i++){
                    if (conv[i].id == id){
                        produit = conv[i];
                        resolve(produit);
                    }
                }
			} else {
            	reject("id is undefined");
			}
        })
    }
    async categorisNameById(id):Promise<any>{
        return new Promise(resolve => {
            let categorie = localStorage.getItem('categories');
            let conv = JSON.parse(categorie);
            if (id !==null ){
                for (let i = 0; i < conv.length;i++){
                    if (conv[i].id == id){
                        categorie = conv[i].id+"=>"+conv[i].name;
                        resolve(categorie);
                    }
                }
            } else {
                reject("id is undefined");
            }
        })
    }
    categorie(id){
            let categorie = localStorage.getItem('categories');
            let conv = JSON.parse(categorie);
            if (id !== null ){
                for (let i = 0; i < conv.length;i++){
                    if (conv[i].id == id){
                      return  categorie = conv[i];
                    }
                }
            } else {
                //reject("id is undefined");
            }

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
