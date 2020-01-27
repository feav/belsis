import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MenuController, ActionSheetController, Platform , ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

import { Storage } from '@ionic/storage';

import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';

import { Base64 } from '@ionic-native/base64/ngx';


import { User } from './../../models/user.model';
import { Restaurant } from './../../models/restaurant.model';
import { UsersService } from './../../services/users.service';
import { UtilsService } from './../../services/utils.service';
import { RoleService } from './../../services/role.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

	public user: User = new User();
  public restaurant: Restaurant = new Restaurant();
	public roles = null;
	public rePassword: string = '';
  public isFormRestaurantOpen: boolean = false;

  constructor(
  	private router: Router,
  	private base64: Base64,
    private platform: Platform,
    private camera: Camera,
    private file: File,
    private webView: WebView,
    private storage: Storage,
    private filePath: FilePath,
    private actionSheetController: ActionSheetController,
    private ref: ChangeDetectorRef,
  	private modalController: ModalController,
  	private usersService: UsersService,
  	private utilsService: UtilsService,
  	private roleService: RoleService
  ) { }

  ngOnInit() {
  	this.initRoles();
    this.roles = this.roles.filter(elt => { return elt != 'admin' && elt != 'superadmin' });
  }

  initRoles(){
  	this.roles = this.roleService.getAllRoles();
  }

  async selectImage(){
        
        const actionSheet = await this.actionSheetController.create({
            header: "localisations d'images",
            buttons: [
                {
                    text: 'Votre Galerie',
                    handler: ()=>{
                        this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: 'Prendre une photo',
                    handler: ()=>{
                        this.takePicture(this.camera.PictureSourceType.CAMERA);
                    }
                },
                {
                    text: 'Annuler',
                    role: 'cancel'
                }
            ]
        });

        await actionSheet.present();
    }

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
        });
    }

  formIsClean(){
    
    let bad = true;

    if (this.isFormRestaurantOpen){
       console.log(this.restaurant)
      if(this.restaurant.nom == '' || this.restaurant.nom == undefined){
        this.utilsService.presentToast("Nom du restaurant non defini", 2000, "danger");
        bad = false;
      }else if(!this.restaurant.devise || this.restaurant.devise == undefined){
        this.utilsService.presentToast("Dévise non defini", 2000, "warning");
        // bad = false;
      }else if(this.restaurant.chiffre_affaire || this.restaurant.chiffre_affaire == undefined  ){
        this.utilsService.presentToast("Chiffre d'affaire non defini", 2000, "warning");
        // bad = false;
      }
    }
    
    if(this.user.nom == ''){
        this.utilsService.presentToast("Nom non defini", 2000, "danger");
        bad = false;
    }
    else if(this.user.prenom == ''){
        this.utilsService.presentToast("Prénom non defini", 2000, "danger");
        bad = false;
    }
    else if(this.user.password == ''){
        this.utilsService.presentToast("Mot de passe non defini", 2000, "danger");
        bad = false;
    }
    else if(this.user.username == ''){
        this.utilsService.presentToast("Pseudo non definie", 2000, "danger");
        bad = false;
    }
    else if(this.user.email == ''){
        this.utilsService.presentToast("Email non definie", 2000, "danger");
        bad = false;
    }
    else if(this.user.password !=  this.rePassword){
        this.utilsService.presentToast("Les mots de passe ne sont pas identiques", 2000, "danger");
        bad = false;
    }
    else if(this.user.role == ''){
        this.utilsService.presentToast("Veillez choisir votre rôle", 2000, "danger");
        bad = false;
    }
    else if(this.user.restaurant_token == '' && !this.isFormRestaurantOpen){
        this.utilsService.presentToast("Veillez préciser l'identifiant du restaurant", 2000, "danger");
        bad = false;
    }
    else if(this.user.avatar == ''){
        this.utilsService.presentToast("Avatar non definie", 2000, "warning");
        // bad = false;
    }

    return bad;
	}

	createAccount() {

		if(!this.formIsClean())
			return;

		this.utilsService.presentLoading('Création en cours ...');

    let data: any = {};

    if(this.isFormRestaurantOpen){

      data = this.user;
      data.nom_restaurant = this.restaurant.nom;
      data.devise = this.restaurant.devise;
      data.chiffre_affaire = this.restaurant.chiffre_affaire;

      console.log(data);

    } else {
      data.restaurant_token = null;
      data = this.user;
      delete data.restaurant_token;
    }


		this.usersService.inscription(this.user)
			.subscribe(
				data => {
					this.utilsService.dismissLoading();
					console.log(data);
					this.utilsService.presentToast("Créé avec succès", 2000, "success");
          // clear infos
          this.user = new User();
          this.restaurant = new Restaurant();
          // redirection
					this.router.navigate(['/login']);
				},
				error => {
					this.utilsService.dismissLoading();
					this.utilsService.presentToast("Une erreur s'est produite", 2000, "danger");
					console.log(error);
				}
			);
      
	}

  manageRestaurant(event, checkbox_elt){
    
    this.initRoles();

    if(checkbox_elt.checked) {
      console.log(this.roles);
      this.roles = this.roles.filter(elt => { return elt == 'admin'});
      this.isFormRestaurantOpen = true;
    }else{
      this.roles = this.roles.filter(elt => { return elt != 'admin' && elt != 'superadmin' });
      this.isFormRestaurantOpen = false;
    }

    this.user.role = this.roles[0];

  }

}
