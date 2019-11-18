import { Component, OnInit } from '@angular/core';
import { ProduitService, CategorieService } from '../../services';
import { PopoverController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController , ToastController, } from '@ionic/angular';
import { SelectIngrediantsComponent } from '../select-ingrediants/select-ingrediants.component';


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

	constructor(public route:ActivatedRoute,
				public router:Router,
				public produitService:ProduitService,
				public categorieService:CategorieService,
				public toaster: ToastController,
				public popoverController:PopoverController) {

		this.ngInit();
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
				else
					this.categories = this.categorieService.getAll();
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
		if (this.verifier()) { 
			if(this.isBoisson)
				this.produitService.save(this.produit);
			else
				this.produitService.update(this.produit);
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

	private onFileSelected(){
		//TODO
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

	public ajouterIngrediant(){
		this.openModal(SelectIngrediantsComponent, {
			"parent": this,
			"ingredian": this.ingrediants,
			"edit": this.edit
		});
	}

	private async openModal(component, params){
	    const popover = await this.popoverController.create({
			component: component,
			event: null,
			translucent: true,
			componentProps: params,
			backdropDismiss: false
	    });
	    return await popover.present();
	}

}
