import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styleUrls: ['./add-produit.component.scss'],
})
export class AddProduitComponent implements OnInit {

	public produit:any = {
		url: "",
		id: 0,
		name:"",
		prix:"",
		quantite:"",
		categories: [],
		logo:"../../assets/prod_1.png"
	};

  constructor() { }

  ngOnInit() {}

}
