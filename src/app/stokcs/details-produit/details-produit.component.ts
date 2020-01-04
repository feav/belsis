import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProduitService } from "../../services/produit.service"
import {JSON_CONFIG_FILENAME} from "tslint/lib/configuration";
import { UtilsService } from  "../../services/utils.service"

@Component({
  selector: 'app-details-produit',
  templateUrl: './details-produit.component.html',
  styleUrls: ['./details-produit.component.scss'],
})
export class DetailsProduitComponent implements OnInit {

	public id:number;
	public produit={};

	constructor(private router: Router,
				private route:ActivatedRoute,
				private products: ProduitService,
				private utilService: UtilsService
	){
		this.route.queryParams.subscribe(params => {
			//console.log(params);
	      // if (params && params.special) {
	      //   this.produit = JSON.parse(params.special);
	      // }
	    });
	}

	ngOnInit() {
		this.route.params.subscribe(params =>{
	    	this.id = params['id'];
		});
	}
    ionViewWillEnter(){
	  
    }

	public editer(id:number){
		this.router.navigate(["/stokcs/edit/"+id]);
	} 

	public supprimer(id:number){
        let newArray = new Array();
        let datas = localStorage.getItem('products');
        let conv = JSON.parse(datas);
        for (let i = 0; i < conv.length;i++){
            if (conv[i].id != this.id){
                newArray.push(conv[i]);
            }
        }
        if (newArray.length>0){
            localStorage.setItem("products",JSON.stringify(newArray));
		}
        this.router.navigate(["/stokcs"]);
	}


}
