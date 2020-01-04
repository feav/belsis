import { Component, Input ,OnInit} from '@angular/core';
import { NavController,ModalController } from '@ionic/angular';
import * as anime from 'animejs';
import * as $ from 'jquery';
import { MenuController , ToastController, } from '@ionic/angular';
// import { Toast } from '@ionic-native/toast/ngx';
import { ProduitService } from "../../services/produit.service";

@Component({
  selector: 'app-choice-produit',
  templateUrl: './choice-produit.page.html',
  styleUrls: ['./choice-produit.page.scss'],
})
export class ChoiceProduitPage implements OnInit {
   @Input() cat_name  : String;
   @Input() cat_id : number;
	private produits: any;
	private selected:number = 1;
	private showProduct:boolean = false;
	private choice:Array<{id:number,qty:number}>=[];
  constructor(
  	// private toast: Toast,
  	private nav:NavController,
  	private modalCtrl:ModalController,
 	public toaster: ToastController,
 	      private prod : ProduitService,


  	) { }
  showListSelectedProduct(){
  	if($("#page-choice-product").hasClass("hide-list-product")){
  		$("#page-choice-product").removeClass("hide-list-product");
  	}
  }
  hideListSelectedProduct(){
  	if(!$("#page-choice-product").hasClass("hide-list-product")){
  		$("#page-choice-product").addClass("hide-list-product");
  	}
  }
  ngOnInit() {
         this.prod.getProductByCategory(this.cat_id).then(
         	datas =>{
                this.produits = datas;
                $("#page-choice-product .loading").hide(1000);
            },error=>{
                console.log(error);
            }
        );
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
  	if(product.qty){
		  this.presentToast(product.qty+" "+product.name+" ajoute avec succes","success");
  	}
  	this.closeDetailProductModal();
  	this.showListSelectedProduct();
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
  /**
  ** When we finish to choose product we send back the list of checked product
  **/
 	choiceProduct()
  {
     let prodBack : Array<any> = [];
    for (let i = 0; i < this.produits.length;i++){
      let produit = this.produits[i];
              if (produit.qty>0){
                  prodBack.push(produit);
              }
          }
    this.modalCtrl.dismiss(prodBack);
  }
}

