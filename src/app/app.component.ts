import { Component } from '@angular/core';

import { Platform,ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

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
      url: '/comptabilite',
      icon: '/assets/logo-stat.svg'
    }
  ];
  public user:any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private toast: ToastController
  ) {
    this.initializeApp();
  }

  async presentToast(message,color) {
      const toast = await this.toast.create({
            header: 'Bonjour'+this.user.name,
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
    });
    let user_exist = localStorage.getItem('user');
    if(user_exist){
      this.user = JSON.parse(user_exist);
    }else{
      this.router.navigate(["/login"],{queryParams:{}});

    }
  }
}
