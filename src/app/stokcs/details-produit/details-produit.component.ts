import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-details-produit',
  templateUrl: './details-produit.component.html',
  styleUrls: ['./details-produit.component.scss'],
})
export class DetailsProduitComponent implements OnInit {

	public id:number;
	public produit:any;

	constructor(private router: Router,
				private route:ActivatedRoute) { }

	ngOnInit() {

		this.route.params.subscribe(params =>{
	    	this.id = params['id'];
		});
		this.produit = {
			url: "../asset/..",
			id: 1,
			name: "Salade de fruit",
			prix: "15 000",
			stock: "64",
			categories : ["Categorie 1", "Categorie 2", "Categorie 3"]
		}
	}

	public editer(id:number){
		this.router.navigate(["/stokcs/edit/"+id]);
	} 

	public supprimer(id:number){
		return null;
	}


}
