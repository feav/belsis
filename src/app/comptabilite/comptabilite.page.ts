import { Component, ViewChild } from '@angular/core';
import { MenuController , ToastController, } from '@ionic/angular';
import { Chart } from 'chart.js';
import { UtilsService } from "../services/utils.service";

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
  private bars: any;
  private bars2:any;

  constructor(private utilService:UtilsService,public menuCtlr: MenuController) {
          this.menuCtlr.enable(true);
  }

  ionViewDidEnter() {
         this.createBarChart();
  }

  openModalMenu(){
     this.utilService.openMenu();
  }
  createBarChart() {
          this.stocks = [ Math.floor(Math.random() * 600) + 1,Math.floor(Math.random() * 600) + 1];
          this.commandes = [Math.floor(Math.random() * 100) + 1,Math.floor(Math.random() * 100) + 1,Math.floor(Math.random() * 100) + 1];
          let datas = [3,4,5,23,4,12,34,5,34,23,55,23,12,13];
          let colors = [];
          let avg = 50;
          let datasLabel = [];
          let max = 5;
          for(var i= 0 ; i< max; i++){
                datas.push(Math.floor(Math.random() * 200) + 100);
                if(datas[i]>avg)
                        colors.push('rgba('+Math.floor(Math.random() * 255)+', '+Math.floor(Math.random() * 255)+', '+Math.floor(Math.random() * 255)+', 0.4)');
                else
                        colors.push('rgba('+Math.floor(Math.random() * 255)+', '+Math.floor(Math.random() * 255)+', '+Math.floor(Math.random() * 255)+', 0.4)');
                datasLabel.push( (i+1)+"" );
          }
          this.bars = new Chart(this.barChart.nativeElement, {
              type: 'bar',
              /*weight: 1,*/
              data: {
                labels: datasLabel,
                datasets: [{
                    label: 'Commaandes',
              /*weight: 1,*/
                    data: datas,
                    backgroundColor: colors,
                    borderColor: colors,
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
        }

}
