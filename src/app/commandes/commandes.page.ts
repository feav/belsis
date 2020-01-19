import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from "../services/utils.service";

import { TableService } from './../services/table.service';
import {error} from 'util';
import { CommandeService } from "../services/commande.service";
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.page.html',
  styleUrls: ['./commandes.page.scss'],
})
export class CommandesPage implements OnInit {

  private etatCommendes : any = [];
  private workMoney: any = 0;
  private commandes: any = [];
  private stocks: Array<number> = [];
  private bars: any;
  private bars2:any;
  private time:String="";
      private tableShop : any;
  private table_id: number;
   private tables : any;  
   constructor(public utilService:UtilsService,public navCtrl: NavController,private commandeService:CommandeService,private router: Router,private route: ActivatedRoute, private tableService: TableService){
        //this.tableService.tableResto();

    this.route.queryParams.subscribe(params => {
        this.table_id = params["table_id"];
    });
    }

  goToAnoterPage(url){
    this.router.navigateByUrl(url);
  }
  
  openModalMenu(){
    this.utilService.openMenu();
  }
  ionViewDidEnter() {
    this.initItems();
    this.dateInit();
    this.tableService.getAllOfMyShop().then(datas=>{
        this.tableShop = datas;
            console.log(datas);
    });
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
    this.stocks = [ Math.floor(Math.random() * 600) + 1,Math.floor(Math.random() * 600) + 1];
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

  initItems(event=null) {
    var etatCommendes = {
        en_cours: 0,
        paye:0,
        trash:0,
        edition:0,
        prete:0
      };
    let utilService = this.utilService;
    if(event==null)
      this.utilService.presentLoading("Chargement de Commandes");
    this.commandeService.getOrderByTable(this.table_id).then(
    datas =>{
        this.commandes = datas;
        console.log(datas);
        this.commandes.forEach(function(item,id){

          if(item.etat == 'paye'){
            etatCommendes.paye+=1; 
            count += item.price;
          }else if(item.etat == 'en_cours'  ){
            etatCommendes.en_cours+=1; 
          }else if(item.etat == 'prete'  ){
            etatCommendes.prete+=1; 
          }else if(item.etat == 'edition'  ){
            etatCommendes.trash+=1; 
          }else {
             etatCommendes.trash +=1; 
          }

          if(event==null)
            utilService.dismissLoading();
          else
            event.target.complete();
      });

      this.etatCommendes = etatCommendes;
      this.workMoney = count;
        
      },error=>{
        console.log(error);
      }
    );
    var cours =0 , fin = 0 , annule = 0, count = 0;
    
      
  }
    ngOnInit() {
   
  }
}
