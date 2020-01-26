import { Component, OnInit } from '@angular/core';
import  {ModalController} from '@ionic/angular'
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  public appPages = [];
  private user:any;
  constructor(private userService: UsersService,private modalCtrl:ModalController) { 
      this.userService.getUser().subscribe(data => {
          this.user = data;
          if(this.user.role == "serveur"){
            this.appPages =[
                {
                  title: 'Acceuil',
                  url: '/',
                  icon: 'home',
                  color:'#142767'
                },
                {
                  title: 'Tables',
                  url: '/table',
                  icon: 'wine',
                  color:'#4CAF50'
                },
                {
                  title: 'Commandes',
                  url: '/commandes',
                  icon: 'restaurant',
                  color:'#FF5722'
                },
                {
                  title: 'Profil',
                  url: '/profile',
                  icon: 'person',
                  color:'cadetblue'
                }
              ];
          }else if(this.user.role == "cuisinier"){
            this.appPages =[
                {
                  title: 'Acceuil',
                  url: '/',
                  icon: 'home',
                  color:'#142767'
                },
                {
                  title:'Preparation',
                  url:"/preparation",
                  icon:'basket',
                  color:'brown'
                },
                {
                  title: 'Stock',
                  url: '/stokcs',
                  icon: 'filing',
                  color:'#FF9800'
                },
                {
                  title: 'Profil',
                  url: '/profile',
                  icon: 'person',
                  color:'cadetblue'
                },
                {
                  title: 'Categories',
                  url: '/categorie',
                  icon: 'apps',
                  color:'#9E9E9E'
                }
              ];

          }else if(this.user.role == "superadmin"){
            this.appPages =[
                {
                  title: 'Acceuil',
                  url: '/',
                  icon: 'home',
                  color:'#142767'
                },
                {
                  title: 'Tables',
                  url: '/table',
                  icon: 'wine',
                  color:'#4CAF50'
                },
                {
                  title: 'Commandes',
                  url: '/commandes',
                  icon: 'restaurant',
                  color:'#FF5722'
                },
                {
                  title:'Preparation',
                  url:"/preparation",
                  icon:'basket',
                  color:'brown'
                },
                {
                  title: 'Stock',
                  url: '/stokcs',
                  icon: 'filing',
                  color:'#FF9800'
                },
                {
                  title: 'Profil',
                  url: '/profile',
                  icon: 'person',
                  color:'cadetblue'
                },
                {
                  title: 'Categories',
                  url: '/categorie',
                  icon: 'apps',
                  color:'#9E9E9E'
                },
                {
                  title: 'Personnel',
                  url: '/personnel',
                  icon: 'people',
                  color:'#f1c40f'
                },
                {
                  title: 'Comptabilite',
                  url: '/comptabilite',
                  icon: 'ios-pie',
                  color:'#d28207'
                },
                {
                  title: 'Ventes',
                  url: '/ventes',
                  icon: 'podium',
                  color:'#009688'
                }
              ];

          }
      }, error => {
          console.log(error);
      });

  }
  selectPage(url){
    this.modalCtrl.dismiss(url);

  }

  logOut(){
    this.modalCtrl.dismiss(-1);
  }
  closeMenu(){
    this.modalCtrl.dismiss(null);
  }
  ngOnInit() {
  }

}
