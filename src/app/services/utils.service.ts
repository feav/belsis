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
}
