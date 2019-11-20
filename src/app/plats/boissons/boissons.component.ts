import { Component, OnInit } from '@angular/core';
import { ProduitService, CategorieService } from '../../services';
import { PopoverController, AlertController } from '@ionic/angular';
import { FiltersComponent } from '../filters/filters.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-boissons',
  templateUrl: './boissons.component.html',
  styleUrls: ['./boissons.component.scss'],
})
export class BoissonsComponent implements OnInit {

	public searchInput:string;

	private produits:Array<any> = [];

	constructor(public popoverController:PopoverController,
				public categorieService: CategorieService,
				public produitService:ProduitService,
				public router:Router,
				public alertController: AlertController) {

	}

	ngOnInit() {
		this.produits = this.produitService.getAllBoissons();
	}

	private ajouterBoissons(){
		this.router.navigate(["/plats/add"],
			{queryParams:{
				edit: false,
				productType: "TYPE_BOISSON"
			}}
		);
	}

	private editer(p){
		this.router.navigate(["/plats/add"],
			{queryParams:{
				edit: true,
				productType: "TYPE_BOISSON",
				produit: JSON.stringify(p)
			}}
		);
	}

	private supprimer(p){
		this.presentAlertConfirm('<strong>Etes-vous sure de vouloir suppremer ce produit </strong> ??', ()=>{
			//delete
		}, ()=>{
			//Nothings to do
		});
	}

	async presentAlertConfirm(m, okCollbak, cancelCallback) {
		const alert = await this.alertController.create({
			header: 'Confirm!',
			message: m,
			buttons: [
				{
					text: 'NON',
					role: 'cancel',
					cssClass: 'color-red',
					handler: cancelCallback
				},
				{
					text: 'OUI',
					cssClass: 'color-green',
					handler: okCollbak
				}
			]
		});
		await alert.present();
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
