import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

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
      title: 'Les Commandes',
      url: '/list',
      icon: '/assets/logo-commande.svg'
    },
    {
      title: 'Le Stock',
      url: '/list',
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
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
