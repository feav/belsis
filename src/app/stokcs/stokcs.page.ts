import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stokcs',
  templateUrl: './stokcs.page.html',
  styleUrls: ['./stokcs.page.scss'],
})
export class StokcsPage implements OnInit {


	public searchInput:string;

	public commandes:Array<any>;

	public commandePages:Array<Array<any>>;

	public produits:Array<any>;

	public produitsPages:any;

	public showList:boolean = true;


  constructor(private router: Router) { }

  ngOnInit() {
  	this.produits = [
  		{
  			id: 1,
  			nom: "Salade de fruits",
  			prix: "15 000",
  			stock: 64,
  			quantite: 3,
  			url:"../../assets/logo-stock.svg"
  		},
  		{
  			id: 1,
  			nom: "Salade de fruits",
  			prix: "15 000",
  			stock: 64,
  			quantite: 3,
  			url:"../../assets/logo-stock.svg"
  		},
  		{
  			id: 1,
  			nom: "Salade de fruits",
  			prix: "15 000",
  			stock: 64,
  			quantite: 3,
  			url:"../../assets/logo-stock.svg"
  		},
  		{
  			id: 1,
  			nom: "Salade de fruits",
  			prix: "15 000",
  			stock: 64,
  			quantite: 3,
  			url:"../../assets/logo-stock.svg"
  		},
  		{
  			id: 1,
  			nom: "Salade de fruits",
  			prix: "15 000",
  			stock: 64,
  			quantite: 3,
  			url:"../../assets/logo-stock.svg"
  		},
  		{
  			id: 1,
  			nom: "Salade de fruits",
  			prix: "15 000",
  			stock: 64,
  			quantite: 3,
  			url:"../../assets/logo-stock.svg"
  		},
  	]
  	this.commandes = [
		{
			id: 1,
			name: "Categorie 1",
			statusFilter: false
		},
		{
			id: 2,
			name: "Categorie 2	",
			statusFilter: false
		},
		{
			id: 1,
			name: "Categorie 1",
			statusFilter: false
		},
		{
			id: 2,
			name: "Categorie 2	",
			statusFilter: false
		},
		{
			id: 1,
			name: "Categorie 1",
			statusFilter: false
		},
		{
			id: 2,
			name: "Categorie 2	",
			statusFilter: false
		},
		{
			id: 1,
			name: "Categorie 1",
			statusFilter: false
		},
		{
			id: 2,
			name: "Categorie 2	",
			statusFilter: false
		},
		{
			id: 1,
			name: "Categorie 1",
			statusFilter: false
		},
		{
			id: 2,
			name: "Categorie 2	",
			statusFilter: false
		},
		{
			id: 1,
			name: "Categorie 1",
			statusFilter: false
		},
		{
			id: 2,
			name: "Categorie 2	",
			statusFilter: false
		},
	];
  	this.commandePages = this.convertArrayToPagible(this.commandes, 6);
  	this.produitsPages = this.convertArrayToPagible(this.produits, 3);
  }

  public rechercher() {
  	
  }

  public convertArrayToPagible(datas: Array<any>, pagesize: number):Array<Array<any>>{
  	let result:Array<Array<any>> = [];
  	for (var i = 0; i < (datas.length / pagesize); ++i) {
  		if (i!=((datas.length / pagesize)-1))
  			result.push(datas.slice(i*pagesize, (i+1)*pagesize));
  		else
  			result.push(datas.slice(i*pagesize, datas.length));
  		
  	}
  	return result;
  }

  public addOrRemoveCategorieToFilter(line, col){
  	if (this.commandePages[line][col].statusFilter) {
	  	this.commandePages[line][col].statusFilter = false;
	  	this.commandes[line*6 + col].statusFilter = false;
  	}else{
	  	this.commandePages[line][col].statusFilter = true;
	  	this.commandes[line*6 + col].statusFilter = true;
  	}

  }

  public setToList(){
  	this.showList = true;
  }

  public setToCard(){
  	this.showList = false;
  }

  public editer(produit){
  	this.router.navigate(["/stokcs/edit/"+produit.id]);
  } 

  public details(produit){
    this.router.navigate(["/stokcs/details/"+produit.id])
  }

  public supprimer(produit:any){
  	return null;
  }

  public ajoutGlobal(){
  	 this.router.navigate(["/stokcs/add"]);
  }
}
