import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilsService } from "../../services/utils.service";
import { ProduitService } from "../../services/produit.service"
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
		pu:"",
		qte:"",
		categories:3
	};
	public id:number;
    public produitCategoris:{};
    public cat;
	constructor(
	    private route: ActivatedRoute,
        private utilService: UtilsService,
        private products: ProduitService,
    ) {}

	ngOnInit() {
        this.route.params.subscribe(params =>{
            this.id = params['id'];
        });
        this.getSelectedProduct();
	}
    ionViewWillEnter(){
        // this.products.allCategoris().then(datas=>{
        //         this.produitCategoris = datas;
        //         console.log(this.produitCategoris);
        //     },error=>{
        //         console.log(error);
        //     }
        // );
    }

    public valider(){
            //console.log(this.cat);
            let testObject = localStorage.getItem('products');
            let newArray = new Array();
            let datas = localStorage.getItem('products');
            let conv = JSON.parse(datas);
            if (this.cat != 'NAN' && this.cat != undefined){
                for (let i = 0; i < conv.length;i++){
                    if (conv[i].id == this.id){
                        // let newProduct = this.products.pushProduct(
                        //     this.id,
                        //     this.produit.name,
                        //     this.produit.pu,
                        //     this.produit.qte,
                        //     this.utilService.curentUserInfo()[0].restoId,
                        //     this.cat,
                        //     this.produit.url);
                        // newArray.push(newProduct);
                    }else {
                        newArray.push(conv[i]);
                    }
                }
            }
            if (newArray.length>0){

                localStorage.setItem("products",JSON.stringify(newArray));
                this.utilService.presentToast("le produit "+this.produit.name+" a bien été modifier ",2000,"success");
            }


	}
    public getSelectedProduct(){
        let datas = localStorage.getItem('products');
        let conv = JSON.parse(datas);
        for (let i = 0; i < conv.length;i++){
            if (conv[i].id == this.id){
                this.produit = conv[i];

            }
        }
    }

}
