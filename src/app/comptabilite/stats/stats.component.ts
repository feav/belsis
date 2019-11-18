import { Chart } from 'chart.js';
import { Component, OnInit , ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit {

  @ViewChild('barChart',{static: true}) barChart;

  @ViewChild('barChartSecond',{static: true}) barChartSecond;

  @ViewChild('barChartBar',{static: true}) barChartBar;
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
  private bars3:any;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.createBarChart();
  }

  public setToEntrees(){
  	this.router.navigate(["/comptabilite/list-entrees"]);
  }

  public setToSorties(){
  	this.router.navigate(["/comptabilite/list-sorties"]);
  }

  createBarChart() {
  	let commandesList = ["Fruit","Glace","Boissons","légumes","Céréales","féculents","Produits","Viande","poisson","œuf","Sucre","Corps gras"];
  	let color = ['rgba(25, 9, 132, 0.2)','rgba(5, 99, 132, 0.2)','rgba(225, 99, 132, 0.2)','rgba(2, 99, 13, 0.2)' ];
  	this.stocks = [ Math.floor(Math.random() * 100000) + 1,Math.floor(Math.random() * 100000) + 1];
  	this.commandes = [Math.floor(Math.random() * 100000) + 1,Math.floor(Math.random() * 100000) + 1];
    	this.bars = new Chart(this.barChart.nativeElement, {
	      type: 'doughnut',
	      /*weight: 1,*/
	      data: {
	        labels: ['Encaissee', 'Retrait'],
	        datasets: [{
	            label: 'Flux financier',
	      /*weight: 1,*/
	            data: [this.commandes[0], this.commandes[1]],
	            backgroundColor: [
	                'rgba(25, 99, 132, 0.2)',
	                'rgba(154, 235, 100, 0.2)'
	            ],
	            borderColor: [
	                'rgba(25, 99, 132, 1)',
	                'rgba(154, 235, 100, 1)'
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
	    let max = Math.floor(Math.random() * commandesList.length) + 5;
	    let listCommande = [];
	    let listColor = [];
	    let listValue= [];
	    for(let i=0;i<max;i++){
	    	listCommande.push(commandesList[Math.floor(Math.random() * commandesList.length) ]);
	    	listColor.push(color[Math.floor(Math.random() * color.length) ]);
	    	listValue.push(Math.floor(Math.random() * 140) );
	    }
	    this.bars3 = new Chart(this.barChartBar.nativeElement, {
	      type: 'bar',
	      /*weight: 1,*/
	      data: {
	        labels: listCommande,
	        datasets: [{
	            label: 'Flux financier',
	      /*weight: 1,*/
	            data: listValue,
	            backgroundColor: listColor,
	            borderColor: listColor,
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
