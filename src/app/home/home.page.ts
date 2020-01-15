import { Component, ViewChild } from '@angular/core';
import { MenuController , ToastController, } from '@ionic/angular';
import { Chart } from 'chart.js';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CommandesPage } from '../commandes/commandes.page';
import { CommandeService } from "../services/commande.service";
import { NavigationExtras } from '@angular/router';

import { NavController } from '@ionic/angular';

import { UtilsService } from "../services/utils.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('barChart',{static: true}) barChart;

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
  constructor(private utilService:UtilsService,public navCtrl: NavController,private commandeService:CommandeService,private router: Router,public menuCtlr: MenuController,public modalController: ModalController) {
  	this.menuCtlr.enable(true);

  }

  openOder(order_id){
    let navigationExtras: NavigationExtras = {
        queryParams: {
            order_id: order_id
        }
    };
    this.navCtrl.navigateForward(['/commandes/new'], navigationExtras);
  }
  goToAnoterPage(url){
    this.router.navigateByUrl(url);
  }
  ionViewDidEnter() {
    if (localStorage.getItem('reload') !== "1"){
        // window.location.reload(true);
        // localStorage.setItem('reload',"1");
	}else {
        //localStorage.setItem('reload',0);
	}
    if(localStorage.getItem('recentLogged') === "1"){
    	// localStorage.setItem('recentLogged', "0");

    }else{
		this.createBarChart();    	
    }
  }

  createBarChart() {
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
    this.utilService.presentLoading("Chargement des pages");
    this.commandeService.getCurrentOrder().then(
    datas =>{
        this.commandes = datas;
        this.commandes.forEach(function(item,id){
        if(item.etat == 'paye'){
          fin += 1;
          count += item.price;
        }else if(item.etat == 'en_cours' || item.etat == 'prete' ){
          cours+=1;
        }else if(item.etat == 'trash'){
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
      this.utilService.dismissLoading();
      },error=>{
        console.log(error);
      }
    );
    var cours =0 , fin = 0 , annule = 0, count = 0;
    
      
	}
}