import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';

import { ProduitService } from "../../services/produit.service";
import { CommandeService } from "../../services/commande.service";
import { TableService } from "../../services/table.service";
import { UtilsService } from "../../services/utils.service";
import * as $ from 'jquery';
import {reject} from "q";
import {ArrayType} from "@angular/compiler";

@Component({
  selector: 'app-nouveau',
  templateUrl: './nouveau.page.html',
  styleUrls: ['./nouveau.page.scss'],
})
export class NouveauPage implements OnInit {

  public searchInput:string;

	public commandes:Array<any>;

	public commandePages:Array<Array<any>>;
    public qte:number = 0;
	public produits:Array<any>;
    public products :Array<any>;
	public produitsPages:any;

	public showList:boolean = true;

	private tables = [];
	private tableId = null;
    public produitCategoris:{};
    public loader = '<img src="../../../assets/loader/loader7.gif" alt="">';

  constructor(
      private router: Router,
      private prod : ProduitService,
      private commandeService: CommandeService,
      private utilsService: UtilsService,
      private toastController: ToastController,
      private tableService: TableService) { }

  ngOnInit() {

  	this.produits = this.prod.getAll();
    //this.produits = this.products;
  	this.tables = this.tableService.getTables();

  	this.commandes = [
	 ];
   let produitsList = ["Salade de fruits",""];
   let commandesList = ["Fruit","Glace","Boissons","légumes","Céréales","féculents","Produits","Viande","poisson","œuf","Sucre","Corps gras"];
    
    for (var i = 1; i <= commandesList.length ; ++i) {
      this.commandes.push({id: i,name:commandesList[i-1],statusFilter: false});
      
    }
  	this.commandePages = this.convertArrayToPagible(this.commandes, 6);
  	this.produitsPages = this.convertArrayToPagible(this.produits, 3);
  }
    ionViewWillEnter(){
        $('.query_status').html(this.loader);
        this.prod.allProduct().then(datas=>{
            $('.query_status').html("");
            this.products = datas;
            console.log(this.products);
        })
        this.prod.allCategoris().then(datas=>{
                this.produitCategoris = datas;
                console.log(this.produitCategoris);
            },error=>{
                console.log(error);
            }
        );

    }
  public Produits(){

  }
  public rechercher(tab) {

  }
  filtrerParID(id) {
      $('.query_status').html(this.loader);
      let produit = localStorage.getItem('produits');
      let conv = JSON.parse(produit);
      let dataFilter = new Array();
      if (id !==null ){
          for (let i = 0; i < conv.length;i++){
              console.log('passer')
              if (conv[i].categories === id){
                  dataFilter.push(conv[i]);
              }
          }
          $('.query_status').html("");
          this.products = dataFilter;
      } else {

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

  public ajouter(produit, quantityOrdered,tableId,stock,produitId){
      console.log(produitId);
      let qte = "qte_"+produitId;
      let self = parseInt($('.'+qte+'').val());
      let stoc = "qtity_"+produitId;
      let stocHidden = produitId+"_stock";
      $('.'+stoc+'').text(quantityOrdered - self);
      $('.'+stocHidden+'').val(quantityOrdered - self);
      console.log(produit);
      this.updateStockQuantitis(produitId,self);
      this.commandeService.addOrder(produit,self, quantityOrdered, this.tableId );
      this.utilsService.presentToast('Commande Ajoutée avec success !', 2000, 'success');

  }
  updateStockQuantitis(idProduit,Qte){
      let testObject = localStorage.getItem('produits');
      let newArray = new Array();
      let datas = localStorage.getItem('produits');
      let conv = JSON.parse(datas);
      for (let i = 0; i < conv.length;i++){
          if (conv[i].id == idProduit){
              conv[i].quantite = conv[i].quantite - Qte;
              newArray.push(conv[i]);
          }else {
              newArray.push(conv[i]);
          }
      }
      if (newArray.length>0){
          localStorage.setItem("produits",JSON.stringify(newArray));
          console.log(newArray);
      }
      this.utilsService.presentToast("modification de la quantité en stock ",2000,"success");
  }
  public plus(index){

      let convert = index.split("_");
      let qte = "qte_"+convert[0];
      let self = $('.'+qte+'');
      let stock = convert[0]+"_stock";
      let selfStock = $('.'+stock+'').val();
      let oldQte = parseInt(self.val());
      console.log(selfStock);
      if(this.stockControl(selfStock,oldQte)){
          self.val( oldQte + 1);
      }else {
          self.val( selfStock - 1);
      }

  }

  public moins(index){
      let convert = index.split("_");
      let qte = "qte_"+convert[0];
      let self = $('.'+qte+'');
      let oldQte = parseInt(self.val());

      if(oldQte >0){
          self.val( oldQte - 1);
      }else {
          self.val( 1);
      }
  }
  public stockControl(stock,qte):boolean{
      if (stock > qte){
          return true
      }else {
          this.utilsService.presentToast('la quantité demandée '+qte+' est superieur a la quantité en stock '+stock, 2000, 'danger');
          return false;
      }
  }

  public ajoutGlobal(){
  	 this.router.navigate(["/commandes/add"]);
  }

}
