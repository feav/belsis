import { Component, OnInit } from '@angular/core';
import { MenuController, ActionSheetController, Platform , ModalController } from '@ionic/angular';

import { User } from './../../../models/user.model';
import { UsersService } from './../../../services/users.service';
import { UtilsService } from './../../../services/utils.service';
import { RoleService } from './../../../services/role.service';


@Component({
  selector: 'app-add-personnel',
  templateUrl: './add-personnel.component.html',
  styleUrls: ['./add-personnel.component.scss'],
})
export class AddPersonnelComponent implements OnInit {

	public user: User = new User();
	public roles = null;

  constructor(
  	private modalController: ModalController,
  	private usersService: UsersService,
  	private utilsService: UtilsService,
  	private roleService: RoleService
  ) { }

  ngOnInit() {
  	this.initRoles();
  }

  closeModal(){
    this.modalController.dismiss(0);
  }

  initRoles(){
  	this.roles = this.roleService.getAllRoles();
  }

  addPersonnel() {
  	
  	if(!this.formIsClean())
  		return;
  	
  	this.utilsService.presentLoading('Enregistrement en cours');

  	this.usersService.saveUser(this.user)
  		.subscribe(
  			user => {
  				this.utilsService.dismissLoading();
  				this.closeModal();
  				console.log(user)
  			},
  			error => {
  				this.utilsService.dismissLoading();
  				console.log(error);
  			}
  		);


  }

  formIsClean(){
    
    let bad = true;
    if(this.user.nom == ''){
        this.utilsService.presentToast("Nom non defini", 2000, "warning");
        bad = false;
    }
    if(this.user.prenom == ''){
        this.utilsService.presentToast("Prénom non defini", 2000, "warning");
        bad = false;
    }
    if(this.user.password == ''){
        this.utilsService.presentToast("Mot de passe non defini", 2000, "warning");
        bad = false;
    }
    if(this.user.username == ''){
        this.utilsService.presentToast("Pseudo non definie", 2000, "warning");
        bad = false;
    }
    if(this.user.email == ''){
        this.utilsService.presentToast("Email non definie", 2000, "warning");
        bad = false;
    }
    if(this.user.role ==''){
        this.utilsService.presentToast("Rôle non definie", 2000, "warning");
        bad = false;
    }
    if(this.user.avatar == ''){
        this.utilsService.presentToast("Avatar non definie", 2000, "warning");
        // bad = false;
    }
    return bad;
	}

}
