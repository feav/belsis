import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { ProduitService } from '../../services/produit.service';
import { UsersService } from '../../services/users.service';
import { MenuController , ToastController, } from '@ionic/angular';
import {test} from "@angular-devkit/core/src/virtual-fs/host";
import * as $ from 'jquery';
=======

declare var fileTrigger:any;

>>>>>>> 095f933d0b3ed0269e62cc3c2cc63509db3e1f10
@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styleUrls: ['./add-produit.component.scss'],
})
export class AddProduitComponent implements OnInit {

<<<<<<< HEAD
	public produits:any = {
	    id:0,
		url: "",
		name:"",
		prix:"",
		quantite:"",
		categories: 0,
		logo:"../../assets/prod_1.png",
        restoID:0,
	};
	public cat;
    public produitCategoris: any[] = [
        {
            id: 1,
            name: 'Fruit',
            description: 'lorem isum 237 product',
        },
        {
            id: 2,
            name: 'Glace',
            description: 'lorem isum 237 product',
        },
        {
            id: 3,
            name: 'Boissons',
            description: 'lorem isum 237 product',
        },
        {
            id: 4,
            name: 'légumes',
            description: 'lorem isum 237 product',
        },
        {
            id: 5,
            name: 'Viande',
            description: 'lorem isum 237 product',
        },
        {
            id: 6,
            name: 'Corps gras',
            description: 'lorem isum 237 product',
        }
    ];
    public restoId:number;
	public categories:any=["Fruit","Glace","Boissons","légumes"]
	constructor(
	    private produit: ProduitService,
        private toast: ToastController,
        private user: UsersService
        ) {
	    this.restoId = this.user.curentUserInfo()[0].restoId;
        localStorage.setItem("categories",JSON.stringify(this.produitCategoris));
    }
=======
	public produit:any = {
		id: 0,
		name:"",
		prix:"",
		quantite:"",
		categories: [],
		url:"../../assets/prod_1.png"
	};

	public categorie:string = "";

	constructor() { }
>>>>>>> 095f933d0b3ed0269e62cc3c2cc63509db3e1f10

	ngOnInit() {}

	public valider(){

        localStorage.setItem("categories",JSON.stringify(this.produitCategoris));
        let testObject = localStorage.getItem('products');
        let oldProduct = new Array();
        if ( testObject != null ){
            this.produits.url = "../../../assets/prod_2.jpg";
        	this.produits.id = 0;
        	this.produits.id = parseInt(this.lastId()) + 1;
        	this.produits.categories = parseInt(this.cat);
        	this.produits.restoID = this.user.curentUserInfo()[0].restoId;
        	let newProduct = this.produit.pushProduct(this.produits.id,this.produits.name,this.produits.prix,this.produits.quantite,this.user.curentUserInfo()[0].restoId,this.produits.categories,this.produits.url);
        	let rec = JSON.parse(testObject);
            rec.push(newProduct);
            console.log(rec);
            localStorage.setItem("products",JSON.stringify(rec));
            this.presentToast(" produit "+this.produits.name+" enregistré ","success");
		}else {
        	this.produits.url = "../../../assets/prod_2.jpg";
        	this.produits.id = 1;
            this.produits.categories = parseInt(this.cat);
            this.produits.restoID = this.user.curentUserInfo()[0].restoId;
            let newProduct = this.produit.pushProduct(this.produits.id,this.produits.name,this.produits.prix,this.produits.quantite,this.user.curentUserInfo()[0].restoId,this.produits.categories,this.produits.url);
            oldProduct.push(newProduct);
            console.log(oldProduct);
            localStorage.setItem("products", JSON.stringify(oldProduct));
            this.presentToast("produit "+this.produits.name+" enregistré ","success");
		}
	}

	public lastId():any{
        let storage = localStorage.getItem('products');
        let  storages = JSON.parse(storage);
        return storages.length;
	}

<<<<<<< HEAD

    async presentToast(message,color) {
        const toast = await this.toast.create({
            position:'top',
            message:message,
            duration: 5000,
            color:color
        });
        toast.present();
    }


}
class Product{
    url: "";
    id: 0;
    name:"";
    prix:"";
    quantite:"";
    categories: '';
    logo:"../../assets/prod_1.png"
=======
	private openChooser(){
		fileTrigger();
	}

	private onFileSelected(event): void {
    	if (event.target.files && event.target.files[0]) {
        	const file = event.target.files[0];

        	const reader = new FileReader();
        	reader.onload = e => this.produit.url = reader.result;

        	reader.readAsDataURL(file);
    	}
	}

>>>>>>> 095f933d0b3ed0269e62cc3c2cc63509db3e1f10
}
