import { Component, OnInit } from '@angular/core';
import  {ModalController} from '@ionic/angular'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  public appPages = [
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
      title: 'Personnel',
      url: '/personnel',
      icon: 'people',
      color:'#f1c40f'
    },
    // {
    //   title: 'Comptabilite',
    //   url: '/list',
    //   icon: 'podium'//'/assets/logo-stat.svg'
    // }
  ];
  constructor(private modalCtrl:ModalController) { }
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
