import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { UtilsService } from "../services/utils.service";
import { CategorieService } from "../services/categorie.service";
import { ProduitService } from "../services/produit.service";
import { TableService } from './../services/table.service';
import {error} from 'util';
import { CommandeService } from "../services/commande.service";
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';

import { AddProduitComponent } from './add-produit/add-produit.component';


@Component({
  selector: 'app-stokcs',
  templateUrl: './stokcs.page.html',
  styleUrls: ['./stokcs.page.scss'],
})
export class StokcsPage implements OnInit {
  private workMoney: any = 0;
  private time:String="";
  private categories: any;
  private tableShop : any;
  private produits : any;
  private cat_id:any;
  private selected:number=-1;
  private cat_name:any;
   constructor(  private prod : ProduitService,private catService: CategorieService,public utilService:UtilsService,public navCtrl: NavController,private commandeService:CommandeService,private router: Router,private route: ActivatedRoute, private tableService: TableService,
     private modalController: ModalController
     ){

    }

  goToAnoterPage(url){
    this.router.navigateByUrl(url);
  }
  
  openModalMenu(){
    this.utilService.openMenu();
  }
  ionViewDidEnter() {
    this.initCategory();
    this.dateInit();
    this.tableService.getAllOfMyShop().then(datas=>{
        this.tableShop = datas;
            console.log(datas);
    });
  }

  showListCategory(){
    if($("#stock-produits").hasClass("hide-list-category")){
      $("#stock-produits").removeClass("hide-list-category");
    }
  }
  hideListCategory(){
    if(!$("#stock-produits").hasClass("hide-list-category")){
      $("#stock-produits").addClass("hide-list-category");
    }
  }
  openOder(order_id){
    let navigationExtras: NavigationExtras = {
        queryParams: {
            order_id: order_id
        }
    };
    this.navCtrl.navigateForward(['/commandes/new'], navigationExtras);
  }
  dateInit(){
    var date = new Date();

    var seconds = date.getSeconds();
    var minutes = date.getMinutes();
    var hour = date.getHours();
    this.time = hour+" : "+minutes;
    setInterval(
      function(){
         seconds = date.getSeconds();
         minutes = date.getMinutes();
           hour = date.getHours();
        this.time = hour+" : "+minutes;
      },60000
    );
  }
  removeText(text){
    if(text=='' || text == 'undefined')
      return;
    return text.replace("index.php/","");
  }
  initCategory(){

    let utilService = this.utilService;

    this.utilService.presentLoading("Chargement de Categories");
    this.catService.getAllByUser().then(datas=>{
      console.log(datas);
            this.categories = datas;
            utilService.dismissLoading();
        });
    
  }

  addProduct(){

    let utilService = this.utilService;
    let product = this.produits[this.selected];
    if(product.qty != 0){
      this.utilService.presentLoading("Mise a jour du stock...") ;
       this.prod.updateStock(product.id,product.qty).then(
        datas =>{
          this.produits = datas;
          utilService.dismissLoading();
          this.initItems(null,this.cat_id,this.cat_name);
          this.utilService.presentToast(product.qty+" "+product.name+" ajoute avec succes",2000,"success");
        },error=>{
          console.log(error);
        }
      );
    }
    this.closeDetailProductModal();
  }
  closeDetailProductModal(){
    $(".modalShow").slideUp(1000);
  }
  openDetailProductModal(){
    $(".modalShow").slideDown(1000);
  }
  openDetailProduct(id){
    this.selected = id;
    this. openDetailProductModal();
  }
  initItems(event=null,cat_id=null,cat_name) {
    if(cat_id){
      this.cat_id = cat_id;
      this.cat_name = cat_name;
    }

    let utilService = this.utilService;

    if(!event)
      this.utilService.presentLoading("Chargement des Produits...") ;
    this.prod.getProductByCategory(this.cat_id).then(
      datas =>{
        this.produits = datas;
        this.hideListCategory();
        if(!event)
          utilService.dismissLoading();
        else
          event.target.complete();
      },error=>{
        console.log(error);
      }
    );
  }
  ngOnInit() {
   
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: AddProduitComponent,
          componentProps: { 
            cat_id: this.cat_id,
            cat_name : this.cat_name
          }
    });
      modal.onDidDismiss()
      /**
      ** @TODO faire en sorte de bien mettre a jour le panier genre
      **/
      .then((data) => {
          console.log(data.data);
          if(data.data ){
            this.initItems(null,this.cat_id,this.cat_name);
          }else{

          }
          
          
          // this.cardTotal = somme;
      });
    return await modal.present();
  }

  filtrerParID() {

  }

}

