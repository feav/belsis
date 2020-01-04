import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';

import { ProduitService } from "../services/produit.service";
import { CommandeService } from "../services/commande.service";
import { UtilsService } from "../services/utils.service";
import {reject} from 'q';
import {ChoiceProduitPage} from "../commandes/choice-produit/choice-produit.page" ;

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.page.html',
  styleUrls: ['./commandes.page.scss'],
})
export class CommandesPage implements OnInit {


	public searchInput:string;

	public commandes:Array<any>;

	public commandePages:Array<Array<any>>;

	public produits:Array<any>;

	public produitsPages:any;

	public showList:boolean = true;
    public comdes:any;
	/*public commandes:any;*/
    public cmd = [{
        id:0,
        qte:0,
        total:0,
    }];



  constructor(private router: Router,private prod : ProduitService, 
    private commandeService: CommandeService, private utilsService: UtilsService, private toastController: ToastController) { }
    ionViewWillEnter() {
    }
  ngOnInit() {
   
  }
}
