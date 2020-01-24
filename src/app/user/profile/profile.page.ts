import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MenuController , ToastController, ActionSheetController, Platform ,ModalController} from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Base64 } from '@ionic-native/base64/ngx';

import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import {User} from '../../models/user.model';
import {Restaurant} from '../../models/restaurant.model';
import { UtilsService } from "../../services/utils.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

    user: User = new User();
    restaurant: Restaurant = new Restaurant();

  public profil={
      id: 0,
      name: "",
      restoId: 0,
      restoName:'',
      roleId: 0,
      roleName:''
  };
  dob: any;
  age: any;

  newPassword: string = '';
  oldPassword: string = '';

  showProfile: boolean;
   constructor(
   		private base64: Base64,
        private platform: Platform,
        private camera: Camera,
        private file: File,
        private webView: WebView,
        private storage: Storage,
        private filePath: FilePath,
        private actionSheetController: ActionSheetController,
        private ref: ChangeDetectorRef,
		private utilService: UtilsService,
		private userService: UsersService,
		private router: Router
	) { }

    ngOnInit() {
        this.init();
    }

  openModalMenu(){
    this.utilService.openMenu();
  }
    async ionViewWillEnter(){
        /*
        await this.userService.UserIsConnec().then(status=>{
             let rec = this.userService.curentUserInfo()[0];
              this.profil.name = rec.name;
              this.profil.restoId = rec.restoId;
              this.profil.roleId = rec.roleId;
              this.profil.restoName = this.userService.getRestoById(rec.restoId);
              this.profil.roleName = this.userService.getRolById(rec.roleId);
              console.log(this.profil.restoName);
        },error=>{
            this.router.navigate(["/login"]);
        });
         */
    }

  	resetPassword() {
  	
	  	let data = {
	  		oldPassword: this.oldPassword,
	  		newPassword: this.newPassword
	  	};

	  	if(!this.formIsClean()) {
	  		this.utilService.presentToast('Remplissez tous les champs', 2000, "danger");
	  		return;
	  	}

	  	this.utilService.presentLoading("Vérification en cours");

	    this.userService.resetPassword(data)
	    	.subscribe(
	    		data => {
	    			this.utilService.dismissLoading();
	    			this.utilService.presentToast('Mot de passe réinitialisé avec succès', 2000, "success");	
	    			console.log(data);
	    		},
	    		error => {
	    			this.utilService.dismissLoading();
	    			if(error.status === 500){
	    				console.log(error.error.message);
	    				this.utilService.presentToast(`${error.error.message}`, 2000, "danger");	
	    			} else {
	    				this.utilService.presentToast('Une erreur s\'est produite', 2000, "danger");
	    				console.log(error);
	    			}
	    			
	    		}
	    	);
  	}

  	formIsClean() {
        
        let bad = true;
        
        if(this.newPassword == ''){
            this.utilService.presentToast("Nom non defini", 2000,"warning");
            bad = false;
        }
        if(this.oldPassword == ''){
            this.utilService.presentToast("Image non definie", 2000,"warning");
            bad = false;
        }

        return bad;
    }

  save(){
  }

  init() {

      // Getting the Current User
      this.userService.getUser().subscribe(data => {
          this.user = data;
          console.log(data);
      }, error => {
          console.log(error);
      });

      // Getting Restaurant of the Current User
      this.userService.getRestaurantOfUser().subscribe( data => {
         // console.log(data);
          this.restaurant = data;
      }, error => {
          console.log(error);
      });
  }

  /* FONCTION UTILISEE */
    async selectImage(){
        
        const actionSheet = await this.actionSheetController.create({
            header: "Select Image Source",
            buttons: [
                {
                    text: 'Load From Library',
                    handler: ()=>{
                        this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: 'Use Camera',
                    handler: ()=>{
                        this.takePicture(this.camera.PictureSourceType.CAMERA);
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });

        await actionSheet.present();
    }
    /* fonction utilisee */
    takePicture(sourceType: PictureSourceType) {

        const options : CameraOptions = {
            quality: 100,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true,
              destinationType: this.camera.DestinationType.DATA_URL
        };

        this.camera.getPicture(options).then(imagePath =>{
            this.user.avatar = 'data:image/jpeg;base64,' + imagePath;
            this.user.user_id = this.user.id;
            this.userService.updateUser(this.user)
            	.subscribe(
            		data => {
            			console.log(data);
            		},
            		error => {
            			console.log(error);
            		}
            	)
        });
    }

}
