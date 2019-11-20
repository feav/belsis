//import { Commande } from 'commande.model';
import { ProduitModel } from './produit.model';
import { Table } from './table.model';

export class ProduitsCommande {
    //id: any;
    produitId: any;
    qte: any;
    commandeId: any;
    pu: any;
    total:any;
    tableId: any;
    restoID:any

    constructor(idCommande,produitId,qte,pu,restoId,tatleID = null){
        this.commandeId = parseInt(idCommande);
        this.produitId = parseInt(produitId);
        this.qte = parseInt(qte);
        this.pu = parseInt(pu);
        this.total = parseInt(pu) *  qte;
        this.tableId = tatleID;
        this.restoID = restoId;
    }

}