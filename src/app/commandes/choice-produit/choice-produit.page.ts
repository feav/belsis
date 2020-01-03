import { Component, Input } from '@angular/core';
import { NavController,ModalController } from '@ionic/angular';
import * as anime from 'animejs';
import * as $ from 'jquery';
import { MenuController , ToastController, } from '@ionic/angular';
// import { Toast } from '@ionic-native/toast/ngx';

@Component({
  selector: 'app-choice-produit',
  templateUrl: './choice-produit.page.html',
  styleUrls: ['./choice-produit.page.scss'],
})
export class ChoiceProduitPage  {
	private produits: Array<any>;
	private selected:number = 1;
	private showProduct:boolean = false;
	private choice:Array<{id:number,qty:number}>=[];
  constructor(
  	// private toast: Toast,
  	private nav:NavController,
  	private modalCtrl:ModalController,
 	public toaster: ToastController,

  	) { }

  ngOnInit() {

         this.produits = [
           {
             id:1,
             name:"WHISKY",
             icon:"https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
             price:Math.floor(Math.random() * 100000) + 1,
             color:"#870b3d"
           }, {
             id:2,
             name:"PIZZA PROMAGE",
             icon:"https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&w=1000&q=80",
             price:Math.floor(Math.random() * 100000) + 1,
             qty:0
           }, {
             id:3,
             name:"PIZZA 2 SAISONS",
             icon:"https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
             price:Math.floor(Math.random() * 100000) + 1,
             qty:0
           },

           {
             id:4,
             name:"PIZZA 3 SAISONS",
             icon:"https://images.unsplash.com/photo-1571066811602-716837d681de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
             price:Math.floor(Math.random() * 100000) + 1,
             qty:0
           }, {
             id:5,
             name:"PIZZA MERGAISE",
             icon:"https://images.unsplash.com/photo-1520201163981-8cc95007dd2a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
             price:Math.floor(Math.random() * 100000) + 1,
             qty:0
           }, {
             id:6,
             name:"PIZZA BOUL",
             icon:"https://images.unsplash.com/photo-1544982503-9f984c14501a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
             price:Math.floor(Math.random() * 100000) + 1,
             qty:0
           }, {
             id:7,
             name:"PIZZA RTU",
             icon:"https://images.unsplash.com/photo-1506354666786-959d6d497f1a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
             price:Math.floor(Math.random() * 100000) + 1,
             qty:0
           }
         ];
      //    anime({
		    //   targets: '.animate-me',
		    //   translateX: [
		    //     { value: 100, duration: 1200 },
		    //     { value: 0, duration: 800 }
		    //   ],
		    //   rotate: '1turn',
		    //   backgroundColor: '#ff00ff',
		    //   duration: 2000
		    // });
  }

	async presentToast(message,color) {
	    const toast = await this.toaster.create({
	    	position:'top',
	    	message:message,
	      	duration: 5000,
	    	color:color
	    });
	    toast.present();
	}
  addProduct(){
  	let product = this.produits[this.selected];
  	this.choice.push({id:product.id,qty:product.qty});
	this.presentToast(product.qty+" "+product.name+" ajoute avec succes","success");
  	this.closeDetailProductModal();
  }
  closeDetailProductModal(){
  	$(".modalShow").slideUp(1000);
  }
  openDetailProductModal(){
  	$(".modalShow").slideDown(1000);
  }
  openDetailProduct(id,qty){
  	this.selected = id;
  	this. openDetailProductModal();
  }
 	choiceProduct(id:any)
  {
    this.modalCtrl.dismiss();
  }
}

