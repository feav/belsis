import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';

import { ProduitService } from "../services/produit.service";
import { CommandeService } from "../services/commande.service";
import { UtilsService } from "../services/utils.service";

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.page.html',
  styleUrls: ['./commandes.page.scss'],
})
export class CommandesPage implements OnInit {


	public searchInput:string;

	public commandes:Array<any>;

	public commandePages:Array<Array<any>>;

	public produits:Array<any>;

	public produitsPages:any;

	public showList:boolean = true;

	/*public commandes:any;*/
    public cmd = [{
        id:0,
        qte:0,
        total:0,
    }];

  orders: any;


  constructor(private router: Router,private prod : ProduitService, 
    private commandeService: CommandeService, private utilsService: UtilsService, private toastController: ToastController) { }
    ionViewWillEnter() {
      this.getcommandes();
    }
  ngOnInit() {

  	this.produits = this.prod.getAll();

  	this.commandes = [
	 ];
   let produitsList = ["Salade de fruits",""]
   let commandesList = ["Fruit","Glace","Boissons","légumes","Céréales","féculents","Produits","Viande","poisson","œuf","Sucre","Corps gras"];
    
    for (var i = 1; i <= commandesList.length ; ++i) {
      this.commandes.push({id: i,name:commandesList[i-1],statusFilter: false});
      
    }
  	this.commandePages = this.convertArrayToPagible(this.commandes, 6);
  	this.produitsPages = this.convertArrayToPagible(this.produits, 3);

    this.getOrders();
  }

  public rechercher(tab) {

  }
  public random(){
    this.produits = this.prod.randomlly();
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

  public getOrders(){
     this.orders = this.commandeService.getOrders();
     console.log(this.orders);
  }
  public getcommandes(){
      let data = localStorage.getItem('commandes');
      let conv = JSON.parse(data);
      this.commandes = conv;
      for (let i = 0 ;  i < conv.length ; i++){
          let qt = 0;
          let total = 0;
          for (let k = 0 ;  k < conv[i].length ; k++){
                   //console.log(conv[i][k]);
               qt += parseInt(conv[i][k].qte);
               total += parseInt(conv[i][k].totalPrice);
          }
          let data = {
              id:i+1,
              qte:qt,
              total:total,
          }
          this.cmd.push(data);
          console.log(qt);
          console.log(total);

      }
      this.cmd.shift();
      console.log(this.cmd);
      //console.log(conv[0][0].qte);
  }
}
