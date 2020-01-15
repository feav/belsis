import { Injectable } from '@angular/core';
import {reject} from 'q';
import { MenuController , ToastController, } from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {UtilsService} from './utils.service';
import {Observable} from 'rxjs';
import {User} from '../models/user.model';
import {Restaurant} from '../models/restaurant.model';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

    public user: any;
    public HOST_BASE: string = this.utilsService.getHostAddress();

  constructor( private toast: ToastController, private http: HttpClient, private utilsService: UtilsService) { }

    getUser(): Observable<User> {
        return this.http.get<User>(`${ this.HOST_BASE }/api/user/get-infos`);
    }

    getRestaurantOfUser(): Observable<Restaurant>{
        return this.http.get<Restaurant>(`${ this.HOST_BASE }/api/restaurant/get-by-user`);
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
                //console.log('connected');
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
