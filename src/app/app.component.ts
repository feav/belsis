import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

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
    },{
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
      title: 'Comptabilite',
      url: '/list',
      icon: '/assets/logo-stat.svg'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private tableService: TableService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.tableService.initializeTables();
    });
  }
}
