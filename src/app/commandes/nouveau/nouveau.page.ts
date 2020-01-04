import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController, AlertController ,ModalController} from '@ionic/angular';

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

  constructor(
      private modalCtrl:ModalController,
      private router: Router,
      private prod : ProduitService,
      private commandeService: CommandeService,
      private utilsService: UtilsService,
      private toastController: ToastController,
      private catService: CategorieService,
      private tableService: TableService) {

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
    ionViewWillEnter(){
        // $('.query_status').html(this.loader);

        this.catService.getAllByUser().then(datas=>{
            this.produitCategoris = datas;
            $("#nouveau-commande .loading").hide(1000);
            console.log(datas);
        });
        // this.prod.getProductByCategory(0).then(
        //    datas =>{
        //         this.products = datas;
        //         let somme = 0 ;
        //         for (let i = 0; i < this.products.length;i++){
        //           let produit = this.products[i];
        //            somme += produit.price*produit.qty;
        //         }
        //         this.cardTotal = somme;
        //         $("#page-choice-product .loading").hide(1000);
        //     },error=>{
        //         console.log(error);
        //     }
        // );
    }

}
