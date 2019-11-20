import { Component } from '@angular/core';

import { Platform,ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

import { TableService } from './services/table.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Plan de Tables',
      url: '/table',
      icon: '/assets/logo-tables.svg'
    },
    {
      title: 'Nouvelle Commande',
      url: '/commandes/new',
      icon: '/assets/logo-commande.svg'
    },
    {
      title: 'Les Commandes',
      url: '/commandes',
      icon: '/assets/logo-commande.svg'
    },
    {
      title: 'Le Stock',
      url: '/stokcs',
      icon: '/assets/logo-stock.svg'
    },
    {
      title: 'Les Produits',
      url: '/plats',
      icon: '/assets/logo-commande.svg'
    },
    {
      title: 'Comptabilite',
      url: '/comptabilite/stats',
      icon: '/assets/logo-stat.svg'
    }
  ];
  public user:any = {};
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private toast: ToastController,
    private tableService: TableService
  ) {
    this.initializeApp();
  }
    curentUserInfo(){
        let curentcy = localStorage.getItem('userconnected');
        return JSON.parse(curentcy);
    }

  async presentToast(message,color) {
      const toast = await this.toast.create({
            header: 'Bonjour '+this.curentUserInfo()[0].name,
            message: "",
            position: 'middle',
            buttons: [
              {
                side: 'start',
                icon: 'user',
                text: 'Profile',
                handler: () => {
                  this.router.navigate(["/profile"],{queryParams:{}});
                }
              }, {
                text: 'Se deconnecter',
                role: 'log-out',
                handler: () => {
                  localStorage.setItem('user',null);
                  this.router.navigate(["/login"],{queryParams:{}});
                }
              }
            ]
          });
      toast.present();
    }
    options(){
      this.presentToast("test","succes");
    }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.tableService.initializeTables();
    });
  }
}
