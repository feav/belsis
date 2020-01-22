import { Injectable } from '@angular/core';
import { LoadingController, ToastController, AlertController ,ModalController} from '@ionic/angular';
import {Settings} from '../models/settings.model';
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import {MenuPage} from "../menu/menu.page" ;
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private isApp = (!document.URL.startsWith('http') || document.URL.startsWith('http://localhost:8080'));
  private settings: Settings = new Settings();
  private hostItem = 'host';
  private loading:any;

  constructor(
              private  authService: AuthService,
              private modalController:ModalController,
              private toastController: ToastController,
              private nativeStorage: NativeStorage,
              private router: Router,
              private loadingController:LoadingController) { }

  async openMenu()
    {
      const modal = await this.modalController.create(
        {
          component: MenuPage
        }
     );
      modal.onDidDismiss()
      .then((data) => {
        if(data['data']==-1){
          this.authService.logout();
          this.router.navigateByUrl('/login');
        }else if(data['data']){
          this.router.navigate([data['data']]);
        }
      });

     return await modal.present();
  }
  async presentToast(message, duration= 2000, color) {
    const toast = await this.toastController.create({
      position: 'top',
      message: message,
      duration: duration,
      color: color
    });
    toast.present();
  }
  async presentLoading(title) {
    this.loading = await this.loadingController.create({
      message: title,
      duration: 5000
    });
    this.loading.present();
  }

  dismissLoading(){
    if(this.loading && this.loading != undefined){
      // this.loading.onDidDismiss();  
    }
    
  }
    curentUserInfo(){
        let curentcy = localStorage.getItem('userconnected');
        return JSON.parse(curentcy);
    }

    // return true if user is logged else return false
    isLogged(){
      let connectedUser = localStorage.getItem('userconnected');

      if(connectedUser){
        
        if(JSON.parse(connectedUser)[0]['id'] > 0)
          return true;
      }

      return false;
    }

  getHostAddress(): string {

    if(this.isApp ) {

      this.nativeStorage.getItem(this.hostItem)
          .then(
              data => {
                if(data){
                  this.settings.setHostAddress(data['host_address']);
                }else{
                  this.settings.setHostAddress('http://belsis.cm/index.php');
                }
              },
              error => {
                this.settings.setHostAddress('http://belsis.cm/index.php');
                console.log(error);
              }
          );
    } else {

      const host_settings = localStorage.getItem(this.hostItem);
      if(host_settings){
        this.settings.setHostAddress(JSON.parse(host_settings)['host_address']);
      }else{
        this.settings.setHostAddress('http://belsis.cm/index.php');
        console.log(this.settings)
      }

    }
    return this.settings.getHostAddress();
  }

}
