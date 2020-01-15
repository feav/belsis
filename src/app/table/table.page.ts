import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';

import { TableService } from './../services/table.service';
import {error} from 'util';
import { CommandeService } from "../services/commande.service";
import { NavController } from '@ionic/angular';
import { UtilsService } from "../services/utils.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.page.html',
  styleUrls: ['./table.page.scss'],
})
export class TablePage implements OnInit {

  private etatCommendes : Array<{
    			label:String,
    			value:Number,
    			logo:String,
    			color:String
    		}> = [];
  private workMoney: any = 0;
  private commandes: any = [];
  private stocks: Array<number> = [];
  private bars: any;
  private bars2:any;
  private time:String="";
      private tableShop : any;

 	private tables : any;  
 	constructor(public utilService:UtilsService,public navCtrl: NavController,private commandeService:CommandeService,private router: Router, private tableService: TableService){
        //this.tableService.tableResto();
  	}

  goToAnoterPage(url){
    this.router.navigateByUrl(url);
  }
  ionViewDidEnter() {
    this.initItems();
    this.dateInit();
    this.tableService.getAllOfMyShop().then(datas=>{
        this.tableShop = datas;
            console.log(datas);
    });
  }
  openOrder(table_id){
    let navigationExtras: NavigationExtras = {
        queryParams: {
            table_id: table_id
        }
    };
    this.navCtrl.navigateForward(['/commandes'], navigationExtras);
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
  	
    let utilService = this.utilService;
    if(event==null)
      this.utilService.presentLoading("Chargement de Tables");
    this.commandeService.getCurrentOrder().then(
    datas =>{
        this.commandes = datas;
        this.commandes.forEach(function(item,id){
        if(item.etat == 'paye'){
          count += item.price;
        }
      });
      this.workMoney = count;
        
          if(event==null)
            utilService.dismissLoading();
          else
            event.target.complete();
      },error=>{
        console.log(error);
      }
    );
    var cours =0 , fin = 0 , annule = 0, count = 0;
    
      
	}
	  ngOnInit() {
   
  }

}
