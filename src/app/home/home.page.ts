import { Component, ViewChild } from '@angular/core';
import { MenuController , ToastController, } from '@ionic/angular';
import { Chart } from 'chart.js';
// import * as HighCharts from 'highcharts';

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
  private commandes: Array<any> = [];
  private stocks: Array<number> = [];
  private bars: any;
  private bars2:any;
  private time:String="";
  constructor(public menuCtlr: MenuController) {
  	this.menuCtlr.enable(true);

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
  	this.commandes = [
      {
        etat: 1,
        name: "Tarte au Fruit",
        price: Math.floor(Math.random() * 1000) + 1000,
        table:4,
        icon:'refresh',
        rotate:true
      },{
        etat: 2,
        name: "Tarte a la paume",
        price: Math.floor(Math.random() * 1000) + 1000,
        table:5,
        icon:'trash',
        rotate:false
      },{
        etat: 2,
        name: "Tarte a la prune",
        price: Math.floor(Math.random() * 1000) + 1000,
        table:4,
        icon:'checkmark',
        rotate:false
      },
      {
        etat: 3,
        name: "Tarte au Fruit",
        price: Math.floor(Math.random() * 1000) + 1000,
        table:4,
        icon:'checkmark',
        rotate:false
      },{
        etat: 1,
        name: "Tarte a la paume",
        price: Math.floor(Math.random() * 1000) + 1000,
        table:5,
        icon:'trash',
        rotate:false
      },{
        etat: 2,
        name: "Tarte a la prune",
        price: Math.floor(Math.random() * 1000) + 1000,
        table:4,
        icon:'refresh',
        rotate:true
      }
    ];
   //  this.bars = new Chart(this.barChart.nativeElement, {
	  //     type: 'polarArea',
	  //     /*weight: 1,*/
	  //     data: {
	  //       labels: ['En cours', 'Finalisees', 'Annulees'],
	  //       datasets: [{
	  //           label: 'Commaandes',
	  //     /*weight: 1,*/
	  //           data: [this.commandes[0], this.commandes[1], this.commandes[2]],
	  //           backgroundColor: [
	  //               'rgba(255, 99, 132, 0.2)',
	  //               'rgba(54, 162, 235, 0.2)',
	  //               'rgba(255, 206, 86, 0.2)'
	  //           ],
	  //           borderColor: [
	  //               'rgba(255, 99, 132, 1)',
	  //               'rgba(54, 162, 235, 1)',
	  //               'rgba(255, 206, 86, 1)'
	  //           ],
	  //           borderWidth: 1
	  //       }]
	  //   },
	  //     options: {
	  //       scales: {
	          
	  //       }
	  //     }
	  //   });
    
    var cours =0 , fin = 0 , annule = 0, count = 0;
    
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
	}
}