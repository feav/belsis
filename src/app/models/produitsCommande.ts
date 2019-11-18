import { Commande } from 'commande.model';
import { ProduitModel } from './produit.model';
import { Table } from './table.model';

export class ProduitsCommande {
    id: any;
    produitId: any;
    qte: any;
    commandeId: any;
    pu: any;
    total:any;
    tableId: any;
    restoID:any

    constructor(id,idCommande,produitId,qte,pu,tatleID = null,restoId){
        this.id = id;
        this.produitId = produitId;
        this.qte = qte;
        this.pu = pu;
        this.total = parseInt(pu.trim()) *  qte;
        this.tableId = tatleID;
        this.restoID = restoId;
    }

}