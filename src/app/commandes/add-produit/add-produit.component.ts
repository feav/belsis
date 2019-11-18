import { Component, OnInit } from '@angular/core';
import { UtilsService } from "../../services/utils.service";
import { ProduitService } from "../../services/produit.service";
import { Commande } from "../../models/commande.model";
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
        let datas = this.products.allCategoris2();
        this.produitCategoris = datas;
        this.products.ProductResto().then(produitResto=>{
        	this.product = produitResto;
        	console.log(this.product);
		},error=>{
        	console.log(error);
		})
    }
    public plus(index){

        let convert = index.split("_");
        let qte = "qte_"+convert[0];
        let self = $('.'+qte+'');
        let stock = convert[0]+"_stock";
        let selfStock:any = $('.'+stock+'').val();
       /* let oldQte = parseInt(self.val());*/
        let oldQte :any = self.val();
        console.log(selfStock);
        if(this.stockControl(selfStock,oldQte)){
            self.val( oldQte + 1);
        }else {
            self.val( selfStock - 1);
        }

    }

    public moins(index){
        let convert = index.split("_");
        let qte = "qte_"+convert[0];
        let self = $('.'+qte+'');
        /*let oldQte = parseInt(self.val());*/
        let oldQte:any = self.val();
        if(parseInt(oldQte) > 0){
            let cov:any  = oldQte -1;
            self.val(cov);
        }else {
            self.val( 1);
        }
    }
    public stockControl(stock,qte):boolean{
        if (stock > qte){
            return true;
        }else {
            this.utilService.presentToast('la quantité demandée '+qte+' est superieur a la quantité en stock '+stock, 2000, 'danger');
            return false;
        }
    }
    allProdcheck(){


        /*let datad = localStorage.getItem('commandes');
        let conv1 = JSON.parse(datad);
       // this.commandes = conv1;
        for (let i = 0 ;  i < conv1.length ; i++){

            for (let k = 0 ;  k < conv1[i].length ; k++){
                let datas = {
                	productId:parseInt(conv1[i][k].produitId),
					qte:parseInt(conv1[i][k].qte),
					pu:parseInt(conv1[i][k].pu),
                    date:'',
                    status:0,
                    totalPrice:conv1[i][k].totalPrice,
                    tableId:0,
                    author:1
                };
                this.cmd2.push(datas);
                this.cmd2.shift();

            }
            this.cmd1.push(this.cmd2);


        }
        this.cmd1.shift();
        //console.log(this.cmd1);
*/















        var valeurs = [];
        $("input:checked[name=adder]").each(function () {
            valeurs.push($(this).val());
        });
        let id = 0;
        let com = new Array();
        let prods = new Array();
        let prod = new Array();
        let fusion= new Array();
        let conv:any;
        if(localStorage.getItem('commandes') == null){
            id = 0;
        }else{
        	console.log('ici');
            let data = localStorage.getItem('commandes');
            conv = JSON.parse(data);
            fusion.push(conv);
            prods.push(conv);
            //let old =
            com.push(conv);
            //prod = new  Array();
            //com.push(conv);
            //console.log(conv);
            id =com.length;
        }
        console.log(id);
        let cmd = new Commande(id);
        for (let i=0;i<valeurs.length;i++){
           if(id === 0){

               let interm:any = "qte_"+valeurs[i];
               let qte:any = $('.'+interm+'').val();
               let prix = "prix_"+valeurs[i];
               let montant:number= parseInt($('.'+prix+'').html().trim())
               //prix = $('.'+prix+'').html();
               let data =  {
                   productId:valeurs[i],
                   qte:qte,
                   pu:montant,
                   date:'15/11/2019',
                   status:0,
                   totalPrice:parseInt(prix) * parseInt(qte),
                   tableId:0,
                   author:this.curentUserInfo()[0].id
               }
               prod.push(data);


               //cmd.pushproduct(d);
		   }
		   if(id>0){
               //let cmd2 = new Commande(0);
               let qte:any = "qte_"+valeurs[i];
               qte = $('.'+qte+'').val();
               let prix = "prix_"+valeurs[i];
               prix = $('.'+prix+'').html();
               let data =  {
                   productId:parseInt(valeurs[i]),
                   qte:parseInt(qte),
                   pu:parseInt(prix),
                   date:'15/11/2019',
                   status:0,
                   totalPrice:parseInt(prix) * parseInt(qte),
                   tableId:0,
                   author:this.curentUserInfo()[0].id

               }
               prod.push(data)

		   }
		}

		if (id <= 0){
           // cmd.pushproduct(pr);
			this.Tab.push(prod);
			this.Tab.shift();
			console.log(this.Tab);
            localStorage.setItem('commandes',JSON.stringify(this.Tab));
		}else {
            this.Tab.push(this.cmd1);
            this.Tab.push(prod);
            this.Tab.shift();
            //console.log(this.Tab);

            localStorage.setItem('commandes',JSON.stringify(this.Tab));
		}
		//console.log(cmd);
        //localStorage.setItem('commandes',JSON.stringify(cmd));

	}
    curentUserInfo(){
        let curentcy = localStorage.getItem('userconnected');
        return JSON.parse(curentcy);
    }
}

