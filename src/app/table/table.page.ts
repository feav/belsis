import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TableService } from './../services/table.service';
import {error} from 'util';
import { CommandeService } from "../services/commande.service";

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
 	constructor(private commandeService:CommandeService,private router: Router, private tableService: TableService){
        //this.tableService.tableResto();
  	}

  goToAnoterPage(url){
    this.router.navigateByUrl(url);
  }
  ionViewDidEnter() {
    this.createBarChart();
    this.tableService.getAllOfMyShop().then(datas=>{
        this.tableShop = datas;
            console.log(datas);
    });
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
    this.commandeService.getCurrentOrder().then(
    datas =>{
        this.commandes = datas;
        this.commandes.forEach(function(item,id){
        if(item.etat == 1){
          cours+=1;
          count += item.price;
        }else if(item.etat == 2){
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
