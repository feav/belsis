import { Component, OnInit } from '@angular/core';
import { ProduitService, CategorieService } from '../../services';
import { PopoverController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController , ToastController, } from '@ionic/angular';
import { PlatModel } from "../../models/plat.model";
import { ProduitsPlat } from "../../models/produitsPlat";
import { SelectIngrediantsComponent } from '../select-ingrediants/select-ingrediants.component';
import { ProduitService } from '../../services/produit.service';
import { UtilsService } from '../../services/utils.service';
import {ArrayType} from '@angular/compiler';


declare var fileTrigger:any;

@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styleUrls: ['./add-produit.component.scss'],
})
export class AddProduitComponent implements OnInit {

	private headerMessage:string;
	private errorMessage:string;
	private edit:boolean = false;
	private productType:string = "TYPE_ENTREE";
	private produit:any;
	private isBoisson:boolean = false;
	private fichier:any;
	private boissons:Array<any>;
	private boissonId:number;
	private categories:Array<any>;
	public ingrediants:Array<any>;
	public imageSrc:string = "";
	public produits:any;
    public products: Array<any>;
    public plats=[];
    public name: any;
    public prix: any;
    public restoId: any;
	constructor(public route:ActivatedRoute,
				public router:Router,
				public produitService:ProduitService,
				public categorieService:CategorieService,
				public toaster: ToastController,
				public popoverController:PopoverController,
				public utilservice: UtilsService
				) {
        this.restoId = this.utilservice.curentUserInfo()[0].restoId;
		this.ngInit();
        this.products = localStorage.getItem('products');
        if (this.products != null){
            this.ingrediants = JSON.parse(this.products);
            console.log(this.ingrediants);
        }
        //this.ingrediants = localStorage.getItem('ingrePlat');

	}

	ngOnInit() {}

	ngInit() {
		this.route.queryParams.subscribe(params => {
			if (params && params.edit != undefined && params.productType != undefined) {
				this.edit = (params.edit == "false")?false:true;
				this.productType = params.productType;
				this.isBoisson = (params.productType == "TYPE_BOISSON");
				if(this.edit && params.produit != undefined){
					this.produit = JSON.parse(params.produit);
				}
				
				if (this.edit) {
					this.headerMessage = "EDITER " 
					switch (this.productType) {
						case "TYPE_ENTREE":
							this.headerMessage += "UN PLAT D'ENTREE";
							break;
						
						case "TYPE_DESSERT":
							this.headerMessage += "UN DESSERT";
							break;

						case "TYPE_PLAT":
							this.headerMessage += "UN PLAT";
							break;

						case "TYPE_BOISSON":
							this.produit.url = "../../../assets/boisson.png";
							this.headerMessage += "UNE BOISSON";
							break;
					}
				} else{
					this.produit = {
						url: "../../../assets/plat.png",
						nom: "",
						prix: "",
						categories: [],
						composition: []
					};
					switch (this.productType) {
						case "TYPE_ENTREE":
							this.headerMessage = "NOUVEAU PLAT D'ENTREE";
							break;
						
						case "TYPE_DESSERT":
							this.headerMessage = "NOUVEAU DESSERT";
							break;

						case "TYPE_PLAT":
                            this.categories = this.categorieService.getAll();

							this.headerMessage = "NOUVEAU PLAT";
							break;

						case "TYPE_BOISSON":
							this.produit.url = "../../../assets/boisson.png";
							this.headerMessage = "NOUVELLE BOISSON";
							break;
					}
				}

				if(this.isBoisson)
					this.boissons = this.produitService.getAllBoissons();
				else{

				}

				/*this.ingrediants = [
					{
						id: 10,
						nom: "Viande de bœuf",
						quantite: 0
					},
					{
						id: 10,
						nom: "Viande de chat",
						quantite: 0
					},
					{
						id: 10,
						nom: "Poulet",
						quantite: 0
					},
					{
						id: 10,
						nom: "Patte d'arrachide",
						quantite: 0
					}
				];*/
			}
		});

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

	public soumettre(){
		if (this.verifier2()) {
			if(this.isBoisson) {
                //this.produitService.save(this.produit);
            }else{
				let data = new Array();
                let news = new Array();
				let oldplat = localStorage.getItem('plats');
				let oldDatas = JSON.parse(oldplat);
				if (oldplat != null){
					for (let i = 0;i < oldDatas.length;i ++){
						//let newProdPlat = new ProduitsPlat(oldDatas[i].id,ingrePlat[i].produitId,ingrePlat[i].qte,this.restoId,ingrePlat[i].name);
						let recup:any = new PlatModel(oldDatas[i].id,oldDatas[i].name,oldDatas[0].prix,this.restoId,1,4);
						news.push(recup);
					}
				}else {

				}



				if (oldplat != null){
                    let datas:any = new PlatModel(oldDatas.length+1,this.name,this.prix,this.restoId,1,4);
                    news.push(datas);
                    console.log(news);
                    localStorage.setItem('plats',JSON.stringify(news));
                    let ingrePlat = localStorage.getItem('ingrePlat');
                    if (ingrePlat != null){
                        ingrePlat = JSON.parse(ingrePlat);
                        news =[];

                        /* odl compos plat */
                        let compoOld = localStorage.getItem('compoPlat');
                        compoOld = JSON.parse(compoOld);
                        for (let i = 0;i < compoOld.length;i++){
                            let recup:any = new ProduitsPlat(compoOld[i].platId,compoOld[i].produitId,compoOld[i].qte,this.restoId,compoOld[i].name);
                            news.push(recup);
                        }
                        let ngPlats = localStorage.getItem('ingrePlat');
							if (ngPlats != null){
								ngPlats = JSON.parse(ngPlats);
								for (let i = 0;i < ngPlats.length;i++){
									let newProdPlat = new ProduitsPlat(oldDatas.length+1,ngPlats[i].productId,ngPlats[i].qte,this.restoId,ngPlats[i].name);
									news.push(newProdPlat);
								}
                                console.log('bingo');
                                localStorage.setItem('compoPlat',JSON.stringify(news));

							}else {
								/* nos ingradiant selected */
							}


                        localStorage.removeItem('ingrePlat');
                    }else{

                    }
				}else {
                   let datas:any = new PlatModel(1 ,this.name,this.prix,this.utilservice.curentUserInfo()[0].restoId,1,4);
				    data.push(datas);
				    localStorage.setItem('plats',JSON.stringify(data));
                    let ingrePlat = localStorage.getItem('ingrePlat');
                    //let news = new Array();
                    if (ingrePlat != null){
                        ingrePlat = JSON.parse(ingrePlat);
                        console.log(ingrePlat);
                        for (let i = 0;i < ingrePlat.length;i ++){
                            let newProdPlat = new ProduitsPlat(1,ingrePlat[i].productId,ingrePlat[i].qte,this.restoId,ingrePlat[i].name);
                            news.push(newProdPlat);
                        }
                        console.log('bingo');
                        localStorage.setItem('compoPlat',JSON.stringify(news));
                        localStorage.removeItem('ingrePlat');
                    }else {

					}
				}

				console.log(this.name);
				console.log(this.prix);



			}
				//this.produitService.update(this.produit);
			this.presentToast(
			 	"Produit enregistré", 
			 	"success");
			this.annuller();
		} else 
			 this.presentToast(
			 	"Certains champs sont pas remplis/invalide veillez remplir correctement", 
			 	"danger");
	}

	public annuller(){
		switch (this.productType) {
			case "TYPE_ENTREE":
				this.router.navigate(["/plats/entrees"]);	
				break;
			
			case "TYPE_DESSERT":
				this.router.navigate(["/plats/desserts"]);
				break;

			case "TYPE_PLAT":
				this.router.navigate(["/plats/plats"]);
				break;

			case "TYPE_BOISSON":
				this.router.navigate(["/plats/boissons"]);
				break;
		}
	}

	private openChooser(){
		fileTrigger();
	}

	private addCategorie(){
		this.produit.categories.push("cat");
	}

	private onFileSelected(event): void {
    	if (event.target.files && event.target.files[0]) {
        	const file = event.target.files[0];

        	const reader = new FileReader();
        	reader.onload = e => this.produit.url = reader.result;

        	reader.readAsDataURL(file);
    	}
	}

	private verifier(){
		if(this.produit.nom == "" || this.produit.nom == undefined)
			return false;

		if(this.produit.prix == "" || this.produit.prix == undefined)
			return false;

		if(this.isBoisson && this.boissonId == undefined)
			return false;

		return true;
	}
    private verifier2(){
        if(this.name == "" || this.name == undefined)
            return false;

        if(this.prix == "" || this.prix == undefined)
            return false;

        if(this.isBoisson && this.boissonId == undefined)
            return false;

        return true;
    }


    public ajouterIngrediant(){
		console.log(this.ingrediants);
		this.openModal(SelectIngrediantsComponent, {
			"parent": this,
			"ingrediants": this.ingrediants,
			"edit": this.edit
		});
	}

	private async openModal(component, params){
	    const popover = await this.popoverController.create({
			component: component,
			event: null,
			translucent: true,
			componentProps: params,
			backdropDismiss: true
	    });
	    return await popover.present();
	}

    public savePlat(){

        //localStorage.setItem("categories",JSON.stringify(this.produitCategoris));
        localStorage.setItem('catplat',JSON.stringify(this.platCat));
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



}
