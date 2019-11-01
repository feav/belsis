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
    	this.router.navigate(["/"],{queryParams:{}});

    }else{
    	this.presentToast("Mot de passe ou nom d'utilisateur incorrect","warning");
    }
  }

}
