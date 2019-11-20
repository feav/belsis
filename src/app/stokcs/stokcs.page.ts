import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProduitService } from "../services/produit.service";
import { UsersService } from "../services/users.service";

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

	public showList:boolean = false;


  constructor(
      private router: Router,
      private prod: ProduitService,
      private user: UsersService
      ) { }

  ngOnInit() {
  	//this.getProduct();
  	/*this.produits = this.prod.getAll();
  	   let commandesList = ["Fruit","Glace","Boissons","légumes","Céréales","féculents","Produits","Viande","poisson","œuf","Sucre","Corps gras"];
    this.commandes = [];
    for (var i = 1; i <= commandesList.length ; ++i) {
      this.commandes.push({id: i,name:commandesList[i-1],statusFilter: false});
      
    }
  	this.commandePages = this.convertArrayToPagible(this.commandes, 6);
  	this.produitsPages = this.convertArrayToPagible(this.produits, 3);*/

  	//this.produitsPages = this.convertArrayToPagible(this.produits, 3);
    //this.setToCard();

  }
    ionViewWillEnter(){
        this.getProduct();
        this.prod.ProductResto().then(produitResto=>{
                this.produits = produitResto;
            },error=>{
                console.log(error);
            }
        );
    }


  public rechercher() {}
  getProduct(){
      let datas = localStorage.getItem('produits');
      //this.produits = JSON.parse(datas);
  }

    public setToList(){
        console.log('show list');
        this.showList = true;
    }

    public setToCard(){
        console.log('show cart');
        this.showList = false;
    }
  /*public convertArrayToPagible(datas: Array<any>, pagesize: number):Array<Array<any>>{
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
  */

  public editer(produit){
  	this.router.navigate(["/stokcs/edit/"+produit.id],{queryParams:produit});
  } 

  public details(produit){
    this.router.navigate(["/stokcs/details/"+produit.id],{queryParams:produit});
  }

  public supprimer(produit:any){
  	return null;
  }
  categorieByID(id){
      console.log(this.prod.categorie(id).name);
     return this.prod.categorie(id).name;
    // console.log(this.prod.categorie(id));
  }
 public ajoutGlobal(){
        this.router.navigate(["/stokcs/add-produit"]);
 }

}
