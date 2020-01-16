import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
   constructor(     private prod : ProduitService,private catService: CategorieService,public utilService:UtilsService,public navCtrl: NavController,private commandeService:CommandeService,private router: Router,private route: ActivatedRoute, private tableService: TableService){

    }

  goToAnoterPage(url){
    this.router.navigateByUrl(url);
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
            this.categories = datas;
            utilService.dismissLoading();
        });
    
  }
  openDetailProduct(indice){
    this.selected = this.produits[indice];
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
}

