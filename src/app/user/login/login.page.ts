import { Component, OnInit } from '@angular/core';
import { MenuController , ToastController, } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
	private user : {name:string,password:string,role:string}
    public users: any[] = [
        {
            id: 1,
            name: 'belsis@gmail.com',
            password: '123456',
			roleId:1,
            birthday:"1995/27/07",
			restoId:1
        },
        {
            id: 2,
            name: 'server@gmail.com',
            password: '123456',
            roleId:2,
            birthday:"1995/27/07",
            restoId:1
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


    constructor(public menuCtrl: MenuController, private toast : ToastController,private router : Router) {
  		this.user = {name:"",password:"",role:""}; 
  	}
	ionViewWillEnter() {

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
    if(this.user.name=="test@gmail.com" && this.user.password=="test"){
    	this.presentToast("Bienvenue "+this.user.name,"success");
    	localStorage.setItem('user', JSON.stringify(this.user));
    	this.router.navigate(["/home"],{queryParams:{}});
      localStorage.setItem('recentLogged', "1");
    }else{
    	this.presentToast("Mot de passe ou nom d'utilisateur incorrect","warning");
    }
  }

}
