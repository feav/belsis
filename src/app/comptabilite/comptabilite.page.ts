import { Chart } from 'chart.js';
import { Component, OnInit , ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProduitService } from "../services/produit.service";
@Component({
  selector: 'app-comptabilite',
  templateUrl: './comptabilite.page.html',
  styleUrls: ['./comptabilite.page.scss'],
})
export class ComptabilitePage  {

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
  public listCmd:Array<any> = [];
  constructor(private router: Router,private product: ProduitService) { }


  //constructor(private router: Router) { }


  ngOnInit() {
  }


  createBarChart() {
  	//let commandesList = ["Fruit","Glace","Boissons","légumes","Céréales","féculents","Produits","Viande","poisson","œuf","Sucre","Corps gras"];
  	/*let commandesList = this.listCmd;*/

      let order = new Array();
      let catego = localStorage.getItem('categories');
      let conv1 = JSON.parse(catego);
      let prix = new Array();
      let catName = new Array();
      let datas2 = localStorage.getItem('orders');
      let conv2 = JSON.parse(datas2);
      for (let i = 0; i < conv2.length;i++){
          //console.log(conv2[i]);
          catName.push(conv1[conv2[i].product.categories].name);
          prix.push(conv2[i].totalAmount)
          //order.push(conv2[i]);totalAmount
      }
      console.log(prix);
      console.log(catName);
      //console.log(order[0].product.categories);
      //let commandesList = newArray;



	  let newArray = new Array();
      let datas = localStorage.getItem('categories');
      let conv = JSON.parse(datas);
      for (let i = 0; i < conv.length;i++){
              newArray.push(conv[i].name);
      }
      //console.log(newArray);
      let commandesList = newArray;

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
	        labels: catName,
	        datasets: [{
	            label: 'Flux financier',
	      /*weight: 1,*/
	            data: prix,
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
