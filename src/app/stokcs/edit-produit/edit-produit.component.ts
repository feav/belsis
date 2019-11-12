import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilsService } from "../../services/utils.service";
@Component({
  selector: 'app-edit-produit',
  templateUrl: './edit-produit.component.html',
  styleUrls: ['./edit-produit.component.scss'],
})
export class EditProduitComponent implements OnInit {

	public produit:any = {
		url: "../../../assets/prod_4.jpeg",
		id: 0,
		name:"",
		prix:"",
		quantite:"",
		categories: []
	};
	public id:number;

	constructor(
	    private route: ActivatedRoute,
        private utilService: UtilsService
    ) { }

	ngOnInit() {
        this.route.params.subscribe(params =>{
            this.id = params['id'];
        });
        this.getSelectedProduct();
	}

	public valider(){

            let testObject = localStorage.getItem('produits');
            let newArray = new Array();
            let datas = localStorage.getItem('produits');
            let conv = JSON.parse(datas);
            for (let i = 0; i < conv.length;i++){
                if (conv[i].id == this.id){
                    conv[i].name     = this.produit.name;
                    conv[i].prix     = this.produit.prix;
                    conv[i].url      = "../../../assets/prod_4.jpeg";
                    conv[i].quantite = this.produit.quantite;
                    newArray.push(conv[i]);
                }else {
                    newArray.push(conv[i]);
                }
            }
            if (newArray.length>0){
                localStorage.setItem("produits",JSON.stringify(newArray));
            }
            this.utilService.presentToast("le produit "+this.produit.name+" a bien été modifier ",2000,"success");

	}
    public getSelectedProduct(){
        let datas = localStorage.getItem('produits');
        let conv = JSON.parse(datas);
        for (let i = 0; i < conv.length;i++){
            if (conv[i].id == this.id){
                this.produit = conv[i];
            }
        }
    }

}
