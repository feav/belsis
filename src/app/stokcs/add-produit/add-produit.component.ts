import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../../services/produit.service';
import { MenuController , ToastController, } from '@ionic/angular';
import {test} from "@angular-devkit/core/src/virtual-fs/host";
import * as $ from 'jquery';
@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styleUrls: ['./add-produit.component.scss'],
})
export class AddProduitComponent implements OnInit {

	public produits:any = {
		url: "",
		id: 0,
		name:"",
		prix:"",
		quantite:"",
		categories: 0,
		logo:"../../assets/prod_1.png"
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
	public categories:any=["Fruit","Glace","Boissons","légumes"]
	constructor(private produit: ProduitService,private toast : ToastController) {
        localStorage.setItem("categories",JSON.stringify(this.produitCategoris));
    }

	ngOnInit() {}

	public valider(){
        localStorage.setItem("categories",JSON.stringify(this.produitCategoris));
        let testObject = localStorage.getItem('produits');
        let oldProduct = new Array();
        if (testObject != null){
            this.produits.url = "../../../assets/prod_2.jpg";
        	this.produits.id = 0;
        	this.produits.id = parseInt(this.lastId()) + 1;
        	this.produits.categories = parseInt(this.cat);
        	let rec = JSON.parse(testObject);
            rec.push(this.produits);
            localStorage.setItem("produits",JSON.stringify(rec));
            this.presentToast(" produit "+this.produits.name+" enregistré ","success");
		}else {
        	this.produits.url = "../../../assets/prod_2.jpg";
        	this.produits.id = 1;
            this.produits.categories = parseInt(this.cat);
        	oldProduct.push(this.produits);
            localStorage.setItem("produits", JSON.stringify(oldProduct));
            this.presentToast("produit "+this.produits.name+" enregistré ","success");
		}
	}

	public lastId():any{
        let storage = localStorage.getItem('produits');
        let  storages = JSON.parse(storage);
        return storages.length;
	}


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
}
