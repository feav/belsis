import { Component, OnInit } from '@angular/core';
import { MenuController , ToastController, } from '@ionic/angular';
import { Router } from '@angular/router';
import { UsersService } from "../../services/users.service";
import {error} from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
	public userName:any;
	public userPassword:any;
    public user: any = [
        {
            id: 1,
            name: 'belsis@gmail.com',
            password: '123456',
			roleId:3,
            birthday:"1995/27/07",
			restoId:1
        },
        {
            id: 2,
            name: 'server@gmail.com',
            password: '123456',
            roleId:3,
            birthday:"1995/27/07",
            restoId:1
        },
        {
            id: 3,
            name: 'comptable@gmail.com',
            password: '123456',
            roleId:2,
            birthday:"1995/27/07",
            restoId:1
        },
        {
            id: 4,
            name: 'belsis2@gmail.com',
            password: '123456',
            roleId:1,
            birthday:"1995/27/07",
            restoId:2
        },
        {
            id: 5,
            name: 'server2@gmail.com',
            password: '123456',
            roleId:3,
            birthday:"1995/27/07",
            restoId:2
        },
        {
            id: 6,
            name: 'comptable2@gmail.com',
            password: '123456',
            roleId:2,
            birthday:"1995/27/07",
            restoId:2
        }
    ];
    public resto: any[] = [
        {
            id: 1,
            name: 'akoa',
            description: 'lorem isum 237 product',
        },
        {
            id: 2,
            name: 'germai',
            description: 'lorem isum 237 product',
        },
        {
            id: 3,
            name: 'etang',
            description: 'lorem isum 237 product',
        }
    ];
    public roles: any[] = [
        {
            id: 1,
            name: 'serveur',
            description: 'lorem isum 237 product',
        },
        {
            id: 2,
            name: 'comptable',
            description: 'lorem isum 237 product',
        },
        {
            id: 3,
            name: 'gerant',
            description: 'lorem isum 237 product',
        }
    ];


    constructor(
        public menuCtrl: MenuController,
        private toast: ToastController,
        private router: Router,
        private userService:UsersService
        ) {
  		/*this.user = {name:"",password:"",role:""};*/
        localStorage.setItem("users",JSON.stringify(this.user));
        localStorage.setItem("resto",JSON.stringify(this.resto));
        localStorage.setItem("roles",JSON.stringify(this.roles));
  	}
	ionViewWillEnter() {

        this.userService.UserIsConnec().then(status=>{
            console.log('connected');
        },error=>{
            console.log('empty');
        });
	  this.menuCtrl.enable(false);
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

  ngOnInit() {
  }
  logForm() {
   /* if(this.user.name=="test@gmail.com" && this.user.password=="test"){
    	this.presentToast("Bienvenue "+this.user.name,"success");
    	localStorage.setItem('user', JSON.stringify(this.user));
    	this.router.navigate(["/home"],{queryParams:{}});
      localStorage.setItem('recentLogged', "1");
    }else{
    	this.presentToast("Mot de passe ou nom d'utilisateur incorrect","warning");
    }*/
  }
  Authenticate(){
      this.userService.Authenticate(this.userName,this.userPassword).then(users=>{
              console.log(users);
              this.userService.saveCurentUserInfo(users);
              this.router.navigate(["/home"]);
          },error=>{
              console.log(error);

          }
      );

  }

}
