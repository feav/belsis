import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styleUrls: ['./add-produit.component.scss'],
})
export class AddProduitComponent implements OnInit {

	public produit:any = {
		name:"",
		prix:"",
		quantite:""
	};

  constructor() { }

  ngOnInit() {}

}
