import { Injectable } from '@angular/core';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private loading:any;
  constructor(private toastController: ToastController,private loadingController:LoadingController) { }

  async presentToast(message, duration=2000, color) {
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
      duration: 2000
    });
    this.loading.present();
  }
  dismissLoading(){
    this.loading.onDidDismiss();
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

}
