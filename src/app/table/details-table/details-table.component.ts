import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalDetailsPage } from "../modal-details/modal-details.page";

@Component({
  selector: 'app-details-table',
  templateUrl: './details-table.component.html',
  styleUrls: ['./details-table.component.scss'],
})
export class DetailsTableComponent implements OnInit {

	private table:any = {
		id:10,
		numero: 23,
		description: "",
		coord_x: 0,
		coord_y: 0
	};

	private encaisser:boolean = true;

	private commande:any = {
		id:10,
		numero: 123,
		produits: [
	  		{
	  			id: 1,
	  			nom: "Salade de fruits",
	  			prix: 15000,
	  			stock: 64,
	  			quantite: 3,
	  			url:"../../assets/logo-stock.svg",
	  			show: false
	  		},
	  		{
	  			id: 1,
	  			nom: "Salade de fruits",
	  			prix: 15000,
	  			stock: 64,
	  			quantite: 3,
	  			url:"../../assets/logo-stock.svg",
	  			show: false
	  		}
		]
	}

	public time:string = "11:10";

	public day: string = "10/10/2012";

	public datas:Array<Array<any>> = [
		[
			{
				commandNomber: 123,
				nombrePlat: 10,
				montant: 10000,
				produits: [
			  		{
			  			id: 1,
			  			nom: "Salade de fruits",
			  			prix: 15000,
			  			stock: 64,
			  			quantite: 3,
			  			url:"../../assets/logo-stock.svg",
			  			show: false
			  		},
			  		{
			  			id: 1,
			  			nom: "Salade de fruits",
			  			prix: 15000,
			  			stock: 64,
			  			quantite: 3,
			  			url:"../../assets/logo-stock.svg",
			  			show: false
			  		}
				]
			},
			{
				commandNomber: 126,
				nombrePlat: 11,
				montant: 10000
			}
		],
		[
			{
				commandNomber: 123,
				nombrePlat: 10,
				montant: 10000,
				produits: [
			  		{
			  			id: 1,
			  			nom: "Salade de fruits",
			  			prix: 15000,
			  			stock: 64,
			  			quantite: 3,
			  			url:"../../assets/logo-stock.svg",
			  			show: false
			  		},
			  		{
			  			id: 1,
			  			nom: "Salade de fruits",
			  			prix: 15000,
			  			stock: 64,
			  			quantite: 3,
			  			url:"../../assets/logo-stock.svg",
			  			show: false
			  		}
				]
			},
			{
				commandNomber: 126,
				nombrePlat: 11,
				montant: 10000
			}
		],
		[
			{
				commandNomber: 130,
				nombrePlat: 12,
				montant: 10000
			},
			{
				commandNomber: 130,
				nombrePlat: 12,
				montant: 10000
			}
		]
	];

	tableId: any;

	constructor(private route : ActivatedRoute,
				private router: Router,
				public modalController: ModalController) {
	}

	ionViewDidEnter(){
		this.route.queryParams.subscribe(params => {
	      if (params && params.tableId) {
	        this.tableId = JSON.parse(params.tableId);
	        console.log(this.tableId);
	      }
	    });
	}


  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalDetailsPage
    });
    return await modal.present();
  }

	ngOnInit() {}

	public showOrHideOperations(i){
		this.commande.produits[i].show = !this.commande.produits[i].show;
	}

	public calculer():number{
		let total:number = 0;
		for (let produit of this.commande.produits) {
		    total = total + (produit.quantite * produit.prix);
		}
		return total;
	}

	public toEncaisser(){
		this.encaisser = true;
	}

	public toImprimer(){
		this.encaisser = false;
	}

}
