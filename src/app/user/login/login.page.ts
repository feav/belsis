import { Component, OnInit } from '@angular/core';
import { MenuController , ToastController, } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UsersService } from "../../services/users.service";
import { AuthService } from './../../services/auth.service';
import {error} from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
	public userName:any;
	public userPassword:any;

    public userLogin : { 
        client_id: string, 
        client_secret: string, 
        grant_type: string, 
        username: string, 
        password: string 
    } = {
        client_id: null, 
        client_secret: null, 
        grant_type: 'password', 
        username: '', 
        password: '' 
    };
    

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
        private userService:UsersService,
        private authService: AuthService
        ) {
        localStorage.setItem("users",JSON.stringify(this.user));
        localStorage.setItem("resto",JSON.stringify(this.resto));
        localStorage.setItem("roles",JSON.stringify(this.roles));
  	}
      
	ionViewWillEnter() {
        this.menuCtrl.enable(false);
	}

	async presentToast(message, color) {
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
  
    Authenticate(){

        if(this.authService.getClientID() && this.authService.getClientSecret()){
            this.userLogin.client_id = this.authService.getClientID();
            this.userLogin.client_secret = this.authService.getClientSecret();
            this.authService.login(this.userLogin).subscribe(
                data=>{
                    if(data.status){
                        this.router.navigate(['/home']);
                    }else{
                        if(data.error.status === 400 && data.error.error == "invalid_request"){
                            // console.log(error)
                        }
                    }
                }
            );
        }else{

          this.authService.createClient({"redirect-uri": "/home", "grant-type": "password" }).subscribe(
              (client)=>{
                if(client){
                    this.authService.storeClient(client);
                    this.userLogin.client_id = client.client_id;
                    this.userLogin.client_secret = client.client_secret;
                }
          });
    }

  }

    goToGeneralSettings(){
        this.router.navigate(['/general-settings']);
    }

}
