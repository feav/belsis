import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../../services/produit.service';
import { MenuController , ToastController, } from '@ionic/angular';
import {test} from "@angular-devkit/core/src/virtual-fs/host";
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
		categories: "",
		logo:"../../assets/prod_1.png"
	};

	constructor(private produit: ProduitService,private toast : ToastController) { }

	ngOnInit() {}

	public valider(){

        let testObject = localStorage.getItem('produits');
        let oldProduct = new Array();
        if (testObject != null){
            this.produits.url = "../../../assets/prod_2.jpg";
        	this.produits.id = 0;
        	this.produits.id = parseInt(this.lastId()) + 1;
        	let rec = JSON.parse(testObject);
            rec.push(this.produits);
            localStorage.setItem("produits",JSON.stringify(rec));
            this.presentToast(" produit "+this.produits.name+" enregistré ","success");
		}else {
        	this.produits.url = "../../../assets/prod_2.jpg";
        	this.produits.id = 1;
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
