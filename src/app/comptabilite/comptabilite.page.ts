import { Component, ViewChild } from '@angular/core';
import { MenuController , ToastController, } from '@ionic/angular';
import { Chart } from 'chart.js';
import { UtilsService } from "../services/utils.service";
import { CommandeService } from "../services/commande.service";
@Component({
  selector: 'app-comptabilite',
  templateUrl: './comptabilite.page.html',
  styleUrls: ['./comptabilite.page.scss'],
})
export class ComptabilitePage  {
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
  private bars: any = null;
  private bars2:any;
  private item : string = "semaine";
  private colors = [];
  private datasLabel = [];
  private type = "prix";
  private originDatas:{
    prix : any,
    commande : any,
    produit : any
  } = {
                prix : [],
                commande : [],
                produit : []
            };
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  constructor(private commandeService : CommandeService,private utilService:UtilsService,public menuCtlr: MenuController) {
          this.menuCtlr.enable(true);
  }
  setType(target){
    this.type = target;
    this.createBarChart();
  }
  goto(target){
    
    if(this.item!=target)
      this.createBarChart() ;

    this.item = target;
    console.log(target);
     this.commandeService.getByRangeOfTime(target).then(
           (datas:any) =>{

             this.originDatas.prix = [];
             this.originDatas.commande = [];
             this.originDatas.produit = [];
             this.datasLabel = [];

             for(var i= 0; i< datas.length; i++){
               this.originDatas.prix.push(datas[i].somme_commande_paye);
               this.originDatas.commande.push(datas[i].nbr_commande_paye);
               this.originDatas.produit.push(datas[i].total_produit);
               this.datasLabel.push(datas[i].label);
             }
             this.createBarChart();
            },error=>{
                console.log(error);
            }
        );
  }
  ionViewDidEnter() {
         this.goto("semaine");
  }
  SlideDidChange(current, next){
    console.log(current);
    console.log(next);

  }
  openModalMenu(){
     this.utilService.openMenu();
  }
  createBarChart() {
            var datas = [];
            this.colors = [];

            if(this.type=='prix')
               datas = this.originDatas.prix;
            else if(this.type=='commande')
               datas = this.originDatas.commande;
            else if(this.type=='produit')
               datas = this.originDatas.produit;

             let avgMontant = datas.reduce((a, b) => (a + b)) / datas.length; 
             for(var i= 0; i< datas.length; i++){
               if(avgMontant < datas[i]){
               	this.colors.push('rgba('+Math.floor(Math.random() * 200)+', '+Math.floor(Math.random() * 255)+', '+Math.floor(Math.random() * 255)+', 0.4)');
               }else if (datas[i] == 0) {
               	this.colors.push('rgba(0, 0, 0, 0.35)');
               }else {
               	this.colors.push('rgba(255, 0, 0, 0.4)');
               }

             }



          if(this.bars == null){
            this.bars = new Chart(this.barChart.nativeElement, {
                type: 'bar',
                /*weight: 1,*/
                data: {
                  labels: this.datasLabel,
                  datasets: [{
                      label: this.item+' en cours',
                /*weight: 1,*/
                      data: datas,
                      backgroundColor: this.colors,
                      borderColor: this.colors,
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
          }else{
            this.bars.data= {
                  labels: this.datasLabel,
                  datasets: [{
                      label: this.item+' en cours',
                      data: datas,
                      backgroundColor: this.colors,
                      borderColor: this.colors,
                      borderWidth: 1
                  }]
                };
            this.bars.update();
          }
        }

}
