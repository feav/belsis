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
  public appPages :any;
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
          if(this.user.role == "serveur"){
            this.appPages =[
                {
                  title: 'Acceuil',
                  url: '/',
                  icon: 'home',
                  color:'#142767'
                },
                {
                  title: 'Tables',
                  url: '/table',
                  icon: 'wine',
                  color:'#4CAF50'
                },
                {
                  title: 'Commandes',
                  url: '/commandes',
                  icon: 'restaurant',
                  color:'#FF5722'
                },
                {
                  title: 'Profil',
                  url: '/profile',
                  icon: 'person',
                  color:'cadetblue'
                }
              ];
          }else if(this.user.role == "cuisinier"){
            this.appPages =[
                {
                  title: 'Acceuil',
                  url: '/',
                  icon: 'home',
                  color:'#142767'
                },
                {
                  title:'Preparation',
                  url:"/preparation",
                  icon:'basket',
                  color:'brown'
                },
                {
                  title: 'Stock',
                  url: '/stokcs',
                  icon: 'filing',
                  color:'#FF9800'
                },
                {
                  title: 'Profil',
                  url: '/profile',
                  icon: 'person',
                  color:'cadetblue'
                },
                {
                  title: 'Categories',
                  url: '/categorie',
                  icon: 'apps',
                  color:'#9E9E9E'
                }
              ];

          }else if(this.user.role == "superadmin"){
            this.appPages =[
                {
                  title: 'Acceuil',
                  url: '/',
                  icon: 'home',
                  color:'#142767'
                },
                {
                  title: 'Tables',
                  url: '/table',
                  icon: 'wine',
                  color:'#4CAF50'
                },
                {
                  title: 'Commandes',
                  url: '/commandes',
                  icon: 'restaurant',
                  color:'#FF5722'
                },
                {
                  title:'Preparation',
                  url:"/preparation",
                  icon:'basket',
                  color:'brown'
                },
                {
                  title: 'Stock',
                  url: '/stokcs',
                  icon: 'filing',
                  color:'#FF9800'
                },
                {
                  title: 'Profil',
                  url: '/profile',
                  icon: 'person',
                  color:'cadetblue'
                },
                {
                  title: 'Categories',
                  url: '/categorie',
                  icon: 'apps',
                  color:'#9E9E9E'
                },
                {
                  title: 'Personnel',
                  url: '/personnel',
                  icon: 'people',
                  color:'#f1c40f'
                },
                {
                  title: 'Comptabilite',
                  url: '/comptabilite',
                  icon: 'ios-pie',
                  color:'#d28207'
                }
              ];

          }
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
