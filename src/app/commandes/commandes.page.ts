import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';

import { ProduitService } from "../services/produit.service";
import { CommandeService } from "../services/commande.service";
import { UtilsService } from "../services/utils.service";
import {reject} from 'q';

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
    public comdes:any;
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
    this.getOrder();
  	this.produits = this.prod.getAll();

  	this.commandes = [
	 ];
   
  }

  public rechercher(tab) {

  }
  public getOrder(restoId = 0){
      let datas = localStorage.getItem('commandes');
      datas = JSON.parse(datas);
      this.comdes = datas;
  }
  TotalPrice(idCmd){
      let produit = localStorage.getItem('produitcommandes');
      let conv = JSON.parse(produit);
      let total:any = 0;
      if (conv !=null ){
          let datas = new Array();
          for (let i = 0; i < conv.length;i++){
              if (conv[i].commandeId == idCmd){
                  total += conv[i].total;
              }
          }
          return total
      } else {
          //reject("id is undefined");
      }
  }

    TotalProtuit(idCmd){
        let produit = localStorage.getItem('produitcommandes');
        let conv = JSON.parse(produit);
        let total:any = 0;
        if (conv !=null ){
            let datas = new Array();
            for (let i = 0; i < conv.length;i++){
                if (conv[i].commandeId == idCmd){
                    datas.push(conv[i]);
                }
            }
            return datas.length;
        } else {
            //reject("id is undefined");
        }
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
      if(conv != null && conv != undefined)
        this.commandes = conv;
      console.log({commande_length: this.commandes.length})
      console.log({commandes: this.commandes})

      for (let i = 0 ;  i < this.commandes.length ; i++){
          let qt = 0;
          let total = 0;

          for (let k = 0 ;  k < conv[i].length ; k++){



               //console.log(conv[i][k]);
               // qt += parseInt(conv[i][k].qte);
               // total += parseInt(conv[i][k].totalPrice);
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
    public detail(CmdId){
        let navigationExtras ={queryParams: {idcmd:CmdId}};
        this.router.navigate(['detail'], navigationExtras);
        //this.router.navigate(["/detail?id="+CmdId]);
    }
}
