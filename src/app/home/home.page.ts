import { Component, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('barChart',{static: true}) barChart;

  @ViewChild('barChartSecond',{static: true}) barChartSecond;
  private etatCommendes : Array<{
    			label:String,
    			value:Number,
    			logo:String,
    			color:String
    		}> = [];
  private commandes: Array<number> = [];
  private stocks: Array<number> = [];
  private bars: any;
  private bars2:any;
  constructor() { }

  ionViewDidEnter() {
    
    if(localStorage.getItem('recentLogged') === "1"){
    	localStorage.setItem('recentLogged', "0");
    	window.location.reload();
    }else{
		this.createBarChart();    	
    }
  }

  createBarChart() {
  	this.stocks = [ Math.floor(Math.random() * 600) + 1,Math.floor(Math.random() * 600) + 1];
  	this.commandes = [Math.floor(Math.random() * 100) + 1,Math.floor(Math.random() * 100) + 1,Math.floor(Math.random() * 100) + 1];
    	this.bars = new Chart(this.barChart.nativeElement, {
	      type: 'doughnut',
	      /*weight: 1,*/
	      data: {
	        labels: ['En cours', 'Finalisees', 'Annulees'],
	        datasets: [{
	            label: 'Commaandes',
	      /*weight: 1,*/
	            data: [this.commandes[0], this.commandes[1], this.commandes[2]],
	            backgroundColor: [
	                'rgba(255, 99, 132, 0.2)',
	                'rgba(54, 162, 235, 0.2)',
	                'rgba(255, 206, 86, 0.2)'
	            ],
	            borderColor: [
	                'rgba(255, 99, 132, 1)',
	                'rgba(54, 162, 235, 1)',
	                'rgba(255, 206, 86, 1)'
	            ],
	            borderWidth: 1
	        }]
	    },
	      options: {
	        scales: {
	          yAxes: [{
	            ticks: {
	              beginAtZero: true
	            }
	          }]
	        }
	      }
	    });


    	this.bars2 = new Chart(this.barChartSecond.nativeElement, {
	      type: 'doughnut',
	      /*weight: 1,*/
	      data: {
	        labels: [ 'En Rupture','Disponnible'],
	        datasets: [{
	            label: '# of Votes',
	      /*weight: 1,*/
	            data: [this.stocks[0], this.stocks[1]],
	            backgroundColor: [
	                'rgba(255, 99, 132, 0.2)',
	                'rgba(54, 235, 100, 0.2)'
	            ],
	            borderColor: [
	                'rgba(255, 99, 132, 1)',
	                'rgba(54, 235, 100, 1)'
	            ],
	            borderWidth: 1
	        }]
	    },
	      options: {
	        scales: {
	          yAxes: [{
	            ticks: {
	              beginAtZero: true
	            }
	          }]
	        }
	      }
	    });
    	this.etatCommendes = [
    		{
    			label:"En cours",
    			value:this.commandes[0],
    			logo:"/assets/logo-commande-en-cours.svg",
    			color:"green"
    		},
    		{
    			label:"Finalisees",
    			value:this.commandes[1],
    			logo:"/assets/logo-commande-finalisee.svg",
    			color:"orange"
    		},
    		{
    			label:"Annulees",
    			value:this.commandes[2],
    			logo:"/assets/logo-commande-annulee.svg",
    			color:"red"
    		}
    	];
	}
}