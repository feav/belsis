import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { User } from './../../models/user.model';
import { Restaurant } from './../../models/restaurant.model';
import { UsersService } from "./../../services/users.service";
import { RestaurantService } from "./../../services/restaurant.service";
import { UtilsService } from "./../../services/utils.service";
import { AddPersonnelComponent } from './add-personnel/add-personnel.component';
import { DetailPersonnelComponent } from './detail-personnel/detail-personnel.component';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.page.html',
  styleUrls: ['./personnel.page.scss'],
})
export class PersonnelPage implements OnInit {

	public restaurant: Restaurant = null;
	public users: User[] = [];


  constructor(
  	private modalController: ModalController,
  	private usersService: UsersService,
  	private restaurantService: RestaurantService,
  	private utilsService: UtilsService
  ) { }

  ngOnInit() {

  	

  	this.loadUsers();

  }

  openModalMenu(){
    this.utilsService.openMenu();
  }

  loadUsers(){

  	// get restaurant
  	this.restaurantService.getRestaurant()
  		.subscribe(
  			restaurant => {
  				
  				if(restaurant){
  					this.restaurant = restaurant;
  					console.log(this.restaurant.id)
  					// getting user by restaurant_id
  					this.usersService.getAllUsersOfRestaurant(this.restaurant.id)
				  		.subscribe(
				  			users => {
				  				this.users = users;
						  	},
						  	error => {
						  		console.log(error);
						  	}
						);

  				}
  			},
  			error => {
  				console.log(error);
  			}
  		);
  }

  async openAddPersonnelModal() {

    const modal = await this.modalController.create({
      component: AddPersonnelComponent,
          componentProps: { 
          }
    });
    
    return await modal.present();
  }

  async showUserDetail(user_id){

  	const modal = await this.modalController.create({
      component: DetailPersonnelComponent,
          componentProps: {
          	user_id: user_id
          }
    });
    
    return await modal.present();

  }

}
