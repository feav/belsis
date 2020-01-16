import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {MenuController} from 'ionic-angular';

import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Acceuil',
      url: '/',
      icon: 'home'//'/assets/logo-tables.svg'
    },
    {
      title: 'Tables',
      url: '/table',
      icon: 'wine'//'/assets/logo-tables.svg'
    },
    {
      title: 'Les Commandes',
      url: '/commandes',
      icon: 'restaurant'//'/assets/logo-commande.svg'
    },
    {
      title: 'Profil',
      url: '/profile',
      icon: 'person'//'/assets/logo-commande.svg'
    },
    // {
    //   title: 'Le Stock',
    //   url: '/stokcs',
    //   icon: 'archive'//'/assets/logo-stock.svg'
    // },
    // {
    //   title: 'Comptabilite',
    //   url: '/list',
    //   icon: 'podium'//'/assets/logo-stat.svg'
    // }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    // public menuController: MenuController,
    private  authService: AuthService) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logout() {
    this.authService.logout();
  }

  closeMenu() {
    // this.menuController.close();
  }


}
