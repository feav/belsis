import { Injectable } from '@angular/core';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private toastController: ToastController) { }

  async presentToast(message, duration=2000, color) {
    const toast = await this.toastController.create({
      position: 'top',
      message: message,
      duration: duration,
      color: color
    });
    toast.present();
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
