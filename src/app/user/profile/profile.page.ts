import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import {User} from '../../models/user.model';
import {Restaurant} from '../../models/restaurant.model';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

    user: User = new User();
    restaurant: Restaurant = new Restaurant();

  /*public person: {company: string, birthdate?: any};*/
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

  showProfile: boolean;
   constructor(
      private userService: UsersService,
      private router: Router) { }

    ngOnInit() {
        this.init();
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
 /* async ionViewDidLoad() {

   /!* let person = JSON.parse(localStorage.getItem('PERSON'));
    if (person){
      this.person = person;
      this.age = this.getAge(this.person.birthdate);
      this.dob = new Date(this.person.birthdate).toISOString();
    }*!/
  }*/

  reset() {
    /*this.person = {company: null, birthdate: null};
    this.dob = null;
    this.showProfile = false;*/
  }

  save(){
   /* this.person.birthdate = new Date(this.dob).getTime();
    this.age = this.getAge(this.person.birthdate);
    this.showProfile = true;
    //localStorage.setItem('PERSON', JSON.stringify(this.person));*/
  }

  getAge(birthdate){
    /*
     let currentTime = new Date().getTime();
     return ((currentTime - birthdate)/31556952000).toFixed(0);
     */
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

}
