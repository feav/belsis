import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OdersModel } from '../../models/oders.model';
import { ProduitsCommande } from '../../models/produitsCommande';
import { ProduitService } from '../../services/produit.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-panier',
  templateUrl: './panier.page.html',
  styleUrls: ['./panier.page.scss'],
})
export class PanierPage implements OnInit {
  public paniers:any;
  constructor(
      private prod: ProduitService,
      private router: Router
      ) { }

  ngOnInit() {
     /* this.paniers = this.produit.Panier();
      console.log(this.paniers);*/
  }
    ionViewWillEnter(){
        this.paniers = this.prod.Panier();
        console.log(this.paniers);

    }
    public savePanier(){
        let orders = localStorage.getItem('commandes');
        let older = JSON.parse(orders);
        let lastProduitcmd = localStorage.getItem('produitcommandes');
        let lastPro = JSON.parse(lastProduitcmd);

        if ( older != null ){
            let oldProduct = new Array();
            let commande = new OdersModel(older.length + 1);
            let cmde = new Array();
            cmde.push(older);
            cmde.push(commande);
            console.log(cmde);
            localStorage.setItem("commandes", JSON.stringify(cmde));

            for (let i = 0;i < this.paniers.length;i++){
                let produtComd = new ProduitsCommande(
                    commande.id,
                    this.paniers[0].produitId,
                    this.paniers[0].qte,
                    this.paniers[0].pu,
                    this.paniers[0].restoID,
                    this.paniers[0].tableId,
                );
                lastPro.push(produtComd);
                /*this.router.navigate(['commandes/new']);*/
            }
            localStorage.setItem("produitcommandes", JSON.stringify(lastPro));
            //localStorage.setItem('panier',null);
            localStorage.removeItem('panier');
        }else {
            let commande = new OdersModel( 1)
            let datas = new Array();
            datas.push(commande);
            localStorage.setItem("commandes", JSON.stringify(datas));
            let cm = new Array();
            for (let i = 0;i < this.paniers.length;i++){
                let produtComd = new ProduitsCommande(
                    1,
                    this.paniers[0].produitId,
                    this.paniers[0].qte,
                    this.paniers[0].pu,
                    this.paniers[0].restoID,
                    this.paniers[0].tableId,
                );
                cm.push(produtComd);

            }
            localStorage.setItem("produitcommandes", JSON.stringify(cm));
            localStorage.removeItem('panier');
            console.log(cm);
            /*this.router.navigate(['commandes/new']);*/

        }

    }

}
