import { Injectable } from '@angular/core';
import {reject} from 'q';
import { MenuController , ToastController, } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor( private toast: ToastController) { }

    async Authenticate(userLogin,userPassword):Promise<any>{

        return new Promise(resolve => {
            
            let users = localStorage.getItem('users');
            let conv = JSON.parse(users);

            if (userLogin !== null && userPassword !== null){
                for (let i = 0; i < conv.length;i++){
                    if (conv[i].name === userLogin && conv[i].password === userPassword){
                        users = conv[i];
                        this.presentToast("Bienvenue "+userLogin,"success");
                        console.log(users);
                        resolve(users);
                    }else {
                        //this.presentToast("Mot de passe ou nom d'utilisateur incorrect","warning");
                        reject("utilisateur inconu");
                    }
                }
            } else {
                this.presentToast("Mot de passe ou nom d'utilisateur incorrect","warning");
                reject("utilisateur inconu");
            }
        })
    }

    saveCurentUserInfo(userconnected){
         console.log(userconnected);
         let userConnected =
            [{ id: userconnected.id,
                name: userconnected.name,
                roleId:userconnected.roleId,
                restoId:userconnected.roleId

            }];
          localStorage.setItem('userconnected',JSON.stringify(userConnected));
    }

    curentUserInfo(){
        let curentcy = localStorage.getItem('userconnected');
        return JSON.parse(curentcy);
    }
    
    async UserIsConnec():Promise<boolean>{
        return new Promise(resolve => {
            let users = localStorage.getItem('userconnected');
            let conv = JSON.parse(users);
            let status = false;
            if (conv.length >0  && conv != "undefined"){
                console.log('connected');
               resolve(status);

            } else {
                console.log('not connected');
                reject(status);
            }
        })
    }
    async presentToast(message,color) {
        const toast = await this.toast.create({
            position:'top',
            message:message,
            duration: 5000,
            color:color
        });
        toast.present();
    }

    getRestoById(id){
            let resto = localStorage.getItem('resto');
            let conv = JSON.parse(resto);
            if (id !==null ){
                for (let i = 0; i < conv.length;i++){
                    if (conv[i].id == id){
                        return conv[i].name;
                    }
                }
            } else {

            }
    }
    getRolById(id){
        let role = localStorage.getItem('roles');
        let conv = JSON.parse(role);
        if (id !==null ){
            for (let i = 0; i < conv.length;i++){
                if (conv[i].id == id){
                    return conv[i].name;
                }
            }
        } else {

        }
    }
}
