import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { User } from './models/user.model';
import { UsersService } from './services/users.service';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

import { AuthService } from './services/auth.service';
import * as $ from 'jquery';


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
      title: 'Commandes',
      url: '/commandes',
      icon: 'restaurant'//'/assets/logo-commande.svg'
    },
    {
      title:'Preparation',
      url:"/preparation",
      icon:'basket'
    },
    {
      title: 'Stock',
      url: '/stokcs',
      icon: 'filing'//'/assets/logo-stock.svg'
    },
    {
      title: 'Profil',
      url: '/profile',
      icon: 'person'//'/assets/logo-commande.svg'
    },
    // {
    //   title: 'Comptabilite',
    //   url: '/list',
    //   icon: 'podium'//'/assets/logo-stat.svg'
    // }
  ];
  private user : any;
  private user_name:any;
  constructor(
    private userService:UsersService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public menuController: MenuController,
    public router: Router,
    private  authService: AuthService) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.userService.getUser().subscribe(data => {
          this.user = data;
          this.user_name = this.user.username;
          console.log(data);
      }, error => {
          console.log(error);
      });
  }

  logout() {
    this.authService.logout();
    this.closeMenu() ;
    this.router.navigateByUrl('/login');
  }
  closeMenu() {
    // $("body > app-root > ion-app > ion-split-pane > ion-menu").toggle();
    this.menuController.enable(true, 'first');
    console.log(this.menuController.close());
  }

  toggleMenu() {
    this.menuController.toggle();
  }


}
