import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  private table_id: number;
   private tables : any;  
   constructor(public navCtrl: NavController,private commandeService:CommandeService,private router: Router,private route: ActivatedRoute, private tableService: TableService){
        //this.tableService.tableResto();

    this.route.queryParams.subscribe(params => {
        this.table_id = params["table_id"];
    });
    }

  goToAnoterPage(url){
    this.router.navigateByUrl(url);
  }
  ionViewDidEnter() {
    this.initItems();
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
  initItems() {
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
    this.commandeService.getOrderByTable(this.table_id).then(
    datas =>{
        this.commandes = datas;
        this.commandes.forEach(function(item,id){
        if(item.etat == 'en_cours'){
          cours+=1;
          count += item.price;
        }else if(item.etat == 'paye'){
          fin += 1;
        }else{
          annule += 1;
        }
      });
      this.workMoney = count;
        this.etatCommendes = [
        {
          label:"En cours",
          value:cours,
          logo:"/assets/logo-commande-en-cours.svg",
          color:"red"
        },
        {
          label:"Finalisees",
          value:fin,
          logo:"/assets/logo-commande-finalisee.svg",
          color:"rgba(54, 162, 235, 0.2)"
        },
        {
          label:"Annulees",
          value:annule,
          logo:"/assets/logo-commande-annulee.svg",
          color:"rgba(255, 206, 86, 1)"
        }
      ];
      },error=>{
        console.log(error);
      }
    );
    var cours =0 , fin = 0 , annule = 0, count = 0;
    
      
  }
    ngOnInit() {
   
  }
}
