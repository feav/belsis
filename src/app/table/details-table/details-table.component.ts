import { Component, OnInit } from '@angular/core';

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
				nombre: 10
			},
			{
				nombre: 11
			},
			{
				nombre: 12
			}
		],
		[
			{
				nombre: 13
			},
			{
				nombre: 14
			},
			{
				nombre: 15
			}
		]
	];

	constructor() { }

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