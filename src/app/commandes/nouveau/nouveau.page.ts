import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { Commande } from "../../models/commande.model";

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
      private tableService: TableService) {
      /*let com = new Array();
      let cmd = new Commande(1,2,12,200,1);
      let cmd2 = new Commande(1,2,12,200,1);
      cmd2.commande[0].push(
          {
              productId:4,
              qte:5,
              pu:6,
              date:'',
              status:0,
              totalPrice:0,
              tableId:0,
              author:4,}
      )
      com.push(cmd);
      com.push(cmd2);
      localStorage.setItem('commandes',JSON.stringify(com));
      console.log(cmd);*/

  }

  private panier:any = {
    nombre: 22
  };

  public cart:any = [{
      produitId:0,
      qte:0,
      pu:0,
      total:0
  }];
  public Cartshop = new Array();


  /*constructor(private router: Router,private prod : ProduitService,
    private commandeService: CommandeService, private utilsService: UtilsService, 
    private toastController: ToastController,
    private tableService: TableService) { }*/

  ngOnInit() {

  	this.produits = this.prod.getAll();
    //this.produits = this.products;
  	this.tables = this.tableService.getTables();
    this.setToCard();

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
  public catname(id){
      return this.prod.categorie(id).name;
  }
  public rechercher(tab) {

  }
  filtrerParID(id) {
      //$('.query_status').html(this.loader);
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


    public savepanier(){

        /*localStorage.setItem("categories",JSON.stringify(this.produitCategoris));
        let testObject = localStorage.getItem('products');
        let oldProduct = new Array();
        if ( testObject != null ){
            this.produits.url = "../../../assets/prod_2.jpg";
            this.produits.id = 0;
            this.produits.id = parseInt(this.lastId()) + 1;
            this.produits.categories = parseInt(this.cat);
            this.produits.restoID = this.user.curentUserInfo()[0].restoId;
            let newProduct = this.produit.pushProduct(this.produits.id,this.produits.name,this.produits.prix,this.produits.quantite,this.user.curentUserInfo()[0].restoId,this.produits.categories,this.produits.url);
            let rec = JSON.parse(testObject);
            rec.push(newProduct);
            console.log(rec);
            localStorage.setItem("products",JSON.stringify(rec));
            this.presentToast(" produit "+this.produits.name+" enregistré ","success");
        }else {
            this.produits.url = "../../../assets/prod_2.jpg";
            this.produits.id = 1;
            this.produits.categories = parseInt(this.cat);
            this.produits.restoID = this.user.curentUserInfo()[0].restoId;
            let newProduct = this.produit.pushProduct(this.produits.id,this.produits.name,this.produits.prix,this.produits.quantite,this.user.curentUserInfo()[0].restoId,this.produits.categories,this.produits.url);
            oldProduct.push(newProduct);
            console.log(oldProduct);
            localStorage.setItem("products", JSON.stringify(oldProduct));
            this.presentToast("produit "+this.produits.name+" enregistré ","success");
        }*/
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

  //  public ajouter(produit, quantityOrdered,tableId,stock,produitId){
 /* public ajouter(prix,produitId){
      console.log(produitId);
     /!* let qte:any = "qte_"+produitId;
      let pu:any = "prix_"+produitId;
       pu = $('.'+pu+'').val();
      let self:any = $('.'+qte+'').val();
      let stoc = "qtity_"+produitId;
      let stocHidden:any = produitId+"_stock";
      let total:any = parseInt(quantityOrdered) - parseInt(self);
      $('.'+stoc+'').text(total);
      $('.'+stocHidden+'').val(quantityOrdered - self);
      console.log(produit);
     let datas = this.prod.pushPanier(produitId,self,pu,this.utilsService.curentUserInfo()[0].restoId);*!/
      //this.updateStockQuantitis(produitId,self);
      //console.log(datas);
     // this.commandeService.addOrder(produit,self, quantityOrdered, this.tableId );
      //this.utilsService.presentToast('Commande Ajoutée avec success !', 2000, 'success');

  }*/
  public pushToCart(prix,produitId){

      let qte:any = "qte_"+produitId;
      let pu:any = prix;
      let self:any = $('.'+qte+'').val();
      let stoc = "qtity_"+produitId;
      let stocHidden:any = produitId+"_stock";
      //let total:any = parseInt(quantityOrdered) - parseInt(self);
     // $('.'+stoc+'').text(total);
      //$('.'+stocHidden+'').val(quantityOrdered - self);
      let datas = this.prod.pushPanier(produitId,self,pu,this.utilsService.curentUserInfo()[0].restoId,this.tableId);
      this.Cartshop.push(datas);
      let panier = localStorage.getItem('panier');
      let older = JSON.parse(panier);

      if ( panier != null ){
          let oldProduct = new Array();

           older.push(datas);
          localStorage.setItem("panier",JSON.stringify(older));
          //this.presentToast(" produit ajouté dans le panier ","success");
      }else {
          localStorage.setItem("panier", JSON.stringify(this.Cartshop));
          //this.Cartshop=[];
      }

      //this.updateStockQuantitis(produitId,self);



      this.Cartshop.push(datas);
      console.log(this.Cartshop);
  }
  updateCommande(){}

  public ajouter(produit, quantityOrdered){
    this.commandeService.addOrder(produit, quantityOrdered, quantityOrdered, this.tableId );
    this.utilsService.presentToast('Produit ajouté dans votre panier', 2000, 'success');
    console.log(this.tableId);

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
      console.log(index);
      let convert = index.split("_");
      let qte:any = "qte_"+convert[0];
      let self:any = $('.'+qte+'');
      let stock:any = convert[0]+"_stock";
      let selfStock:any = $('.'+stock+'').val();
      let oldQte:any = parseInt(self.val().trim());
      console.log(oldQte);
      console.log(selfStock);
      if(this.stockControl(selfStock,oldQte)){
          self.val( oldQte + 1);
      }else {
          let t:any = selfStock - 1;
          self.val(t);
      }

  }

  public moins(index){
      let convert = index.split("_");
      let qte:any = "qte_"+convert[0];
      let self:any = $('.'+qte+'');
      let oldQte:any = parseInt(self.val().trim());
      console.log(oldQte);
      if(oldQte >0){
          let g:any = oldQte - 1;
          self.val(g);
      }else {
          self.val( 1);
      }
  }
  public stockControl(stock,qte):boolean{
      console.log(stock);
      console.log(qte);
      if (stock > qte){
          return true
      }else {
          this.utilsService.presentToast('la quantité demandée '+qte+' est superieur a la quantité en stock '+stock, 2000, 'danger');
          return false;
      }
  }

  public ajoutGlobal(){
     this.utilsService.presentToast('Commande validée', 2000, 'success');
     this.router.navigate(["/commandes/new"]);
  }
    public Mycart(){
        this.router.navigate(["/panier"]);
    }

}
