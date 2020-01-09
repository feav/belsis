import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController, AlertController ,ModalController} from '@ionic/angular';
import { MenuController } from '@ionic/angular';

import { ProduitService } from "../../services/produit.service";
import { CategorieService } from "../../services/categorie.service";
import { CommandeService } from "../../services/commande.service";
import { TableService } from "../../services/table.service";
import { UtilsService } from "../../services/utils.service";
import * as $ from 'jquery';
import {reject} from "q";
import {ArrayType} from "@angular/compiler";
import {ChoiceProduitPage} from "../../commandes/choice-produit/choice-produit.page" ;

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
	public produits:any;
    public plats:Array<any>;
    public products :any=[];
	public produitsPages:any;

	public showList:boolean = true;

	private tables = [];
	private tableId = null;

    private  shop_id : number;
    public produitCategoris:{};
    public loader = '<img src="../../../assets/loader/loader7.gif" alt="">';
    private cardTotal : number = 0;
    private tableShop : any;
    private selected : number = -1;
    private order_id:number;

  constructor(
         public toaster: ToastController,
      private modalCtrl:ModalController,
      private router: Router,private route: ActivatedRoute,
      private prod : ProduitService,
      private commandeService: CommandeService,
      private utilsService: UtilsService,
      private toastController: ToastController,
      private catService: CategorieService,
      private tableService: TableService,) {
    this.route.queryParams.subscribe(params => {
        this.order_id = params["order_id"];
    });
  }

  async moveToFirst(cat_name , cat_id)
    {
      const modal = await this.modalCtrl.create(
        {
          component: ChoiceProduitPage,
          componentProps: { 
            cat_id: cat_id,
            cat_name : cat_name
          }
        }
     );
      modal.onDidDismiss()
      /**
      ** @TODO faire en sorte de bien mettre a jour le panier genre
      **/
      .then((data) => {
          console.log(data.data);
          let somme = 0 ;
          for (let i = 0; i < data.data.length;i++){
            let produit = data.data[i];
              somme += produit.price*produit.qty;
             this.products.push(produit);
                this.hideListCategory();
          }
          this.commandeService.addProductByOrder(this.order_id,data.data).then(
             datas =>{
                this. refreshCommande();
              },error=>{
                console.log(error);
              }
          );
          this.cardTotal = somme;
      });

     return await modal.present();
  }
  private panier:Array<any> = [];


  public cart:any = [{
      produitId:0,
      qte:0,
      pu:0,
      total:0
  }];
  public Cartshop = new Array();


  ngOnInit() {
  	this.commandes = [
	 ];
    

  }
  addProduct(){
    let somme = 0 ;
    for (let i = 0; i < this.products.length;i++){
      let produit = this.products[i];
      somme += produit.price*produit.qty;
    }
    this.cardTotal = somme;
    this.commandeService.addProductByOrder(this.order_id,[this.products[this.selected]]).then(
    datas =>{
        this. refreshCommande();
      },error=>{
        console.log(error);
      }
    );
    this.selected = -1;
  }
  openDetailProduct(id){
    this.selected = id;
  }
  showListCategory(){
    if($("#nouveau-commande").hasClass("hide-list-category")){
      $("#nouveau-commande").removeClass("hide-list-category");
    }
  }
  hideListCategory(){
    if(!$("#nouveau-commande").hasClass("hide-list-category")){
      $("#nouveau-commande").addClass("hide-list-category");
    }
  }
  refreshCommande(){
       this.commandeService.getCommandeById(this.order_id).then(
             datas =>{
                  this.produits = datas;
              },error=>{
                  console.log(error);
              }
          );
  }
  deleteOrder(){
      /**
      ** @TODO Demander confirmation avant d'effectuer l'action
      ***/
    this.commandeService.deleteOrder(this.order_id).then(
             datas =>{
               /**
               ** @TODO revenir dans la page d'acceui
               ***/
               this.presentToast("La commande a ete supprimee","success");
               this.router.navigate(["/"]);
              },error=>{
               /**
               ** @TODO afficher un message d'erreur
               ***/
                  console.log(error);
              }
          );
  }

  async presentToast(message,color) {
      const toast = await this.toaster.create({
        position:'top',
        message:message,
          duration: 5000,
        color:color
      });
      toast.present();
  }
  removeProduct(product){
    this.commandeService.removeProduct(this.order_id, product).then(
             datas =>{
                  this.produits = datas;
                   this.presentToast("Le produit a bel et bien et supprime","success");
                  this.refreshCommande();
              },error=>{
                  console.log(error);
              }
          );
  }
  /**
  **
  ** permet d envoyer la commande a la cuisine en preparation cas d un restaurant
  **/
  prepareOrder(){
    this.commandeService.prepareOrder(this.order_id).then(
             datas =>{
                   this.presentToast("La commande a ete envoye en preparation","success");
                  this.refreshCommande();
              },error=>{
                  console.log(error);
              }
          );
  }
  /**
  ** permet d encaisser une commande. une commande encaissee ne peut etre supprimee 
  **/
  casheOrder(){
    this.commandeService.cashOrder(this.order_id).then(
             datas =>{
                   this.presentToast("La commande a ete en caissee avec succes","success");
                  this.refreshCommande();
              },error=>{
                  console.log(error);
              }
          );
  }

    ionViewWillEnter(){
        // $('.query_status').html(this.loader);
        this.refreshCommande();
        this.catService.getAllByUser().then(datas=>{
            this.produitCategoris = datas;
            $("#nouveau-commande .loading").hide(1000);
            console.log(datas);
        });
        this.tableService.getAllOfMyShop().then(datas=>{
            this.tableShop = datas;
            console.log(datas);
        });
    }

}
