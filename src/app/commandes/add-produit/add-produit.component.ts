import { Component, OnInit } from '@angular/core';
import { UtilsService } from "../../services/utils.service";
import { ProduitService } from "../../services/produit.service";
import * as $ from 'jquery';
import {error} from 'util';
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
    public Tab = [
        [{}]
    ];
	public product:any;
    public id:number;
    public produitCategoris:{};
    public cat;
    public commandId:number;
    public cmd1 = [{
        productId:0,
        qte:0,
        pu:0,
        date:0,
        status:0,
        totalPrice:0,
        tableId:0,
        author:0
    }];
    public cmd2 = [{
        productId:0,
        qte:0,
        pu:0,
        date:0,
        status:0,
        totalPrice:0,
        tableId:0,
        author:0
    }];

  constructor(
      private utilService: UtilsService,
      private products: ProduitService)
  {

  }

  ngOnInit() {}
  Showmodal(){
  	$('.modal').fadeToggle();
  }
  hidemodal(){
        $('.modal').fadeOut(500);
  }
    ionViewWillEnter() {
    }   
}

