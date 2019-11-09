import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-modal-details',
  templateUrl: './modal-details.page.html',
  styleUrls: ['./modal-details.page.scss'],
})
export class ModalDetailsPage implements OnInit {

	@Input()
	public commande:any = {
		produits: []
	};

  constructor() { }

  ngOnInit() {
  }

  public calculer(){
  	
  }

}
