import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-produit',
  templateUrl: './edit-produit.component.html',
  styleUrls: ['./edit-produit.component.scss'],
})
export class EditProduitComponent implements OnInit {

	public produit:any = {
		url: "",
		id: 0,
		name:"",
		prix:"",
		quantite:"",
		categories: []
	};

	constructor() { }

	ngOnInit() {}

	public valider(){
		
	}

}
