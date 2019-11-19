import { Component, OnInit } from '@angular/core';

declare var fileTrigger:any;

@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styleUrls: ['./add-produit.component.scss'],
})
export class AddProduitComponent implements OnInit {

	public produit:any = {
		id: 0,
		name:"",
		prix:"",
		quantite:"",
		categories: [],
		url:"../../assets/prod_1.png"
	};

	public categorie:string = "";

	constructor() { }

	ngOnInit() {}

	public valider(){
		
	}

	private openChooser(){
		fileTrigger();
	}

	private onFileSelected(event): void {
    	if (event.target.files && event.target.files[0]) {
        	const file = event.target.files[0];

        	const reader = new FileReader();
        	reader.onload = e => this.produit.url = reader.result;

        	reader.readAsDataURL(file);
    	}
	}

}
