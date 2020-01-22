import { Component, OnInit, Input } from '@angular/core';
import { MenuController, ActionSheetController, Platform , ModalController } from '@ionic/angular';

import { User } from './../../../models/user.model';
import { UsersService } from './../../../services/users.service';
import { UtilsService } from './../../../services/utils.service';
import { RoleService } from './../../../services/role.service';

@Component({
  selector: 'app-detail-personnel',
  templateUrl: './detail-personnel.component.html',
  styleUrls: ['./detail-personnel.component.scss'],
})
export class DetailPersonnelComponent implements OnInit {

	@Input() user_id;

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
  	this.loadUser();
  }

  closeModal(){
    this.modalController.dismiss(0);
  }

  loadUser() {

  	this.usersService.getUserById( this.user_id )
  		.subscribe(
  			data => {
  				this.user = data;
					// console.log(data);
  			},
  			error => {
  				console.log(error);
  			}
  		)
  }

  initRoles() {
  	this.roles = this.roleService.getAllRoles();
  }

  updatePersonnel() {
  	let userToUpdata: any = this.user;
  	userToUpdata.user_id = this.user.id;
  	this.utilsService.presentLoading("Ajout du personnel");

  	this.usersService.updateUser(userToUpdata)
  		.subscribe(
  			data => {
  				this.utilsService.dismissLoading();
  				this.utilsService.presentToast('Mise à jour réussie', 2000, 'success');
  			},
  			error => {
  				this.utilsService.dismissLoading();
  				console.log(error);
  			}
  		)
  }



}
