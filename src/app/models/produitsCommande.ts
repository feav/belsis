import { Commande } from 'commande.model';
import { Product } from './product.model';
import { Table } from './table.model';

export class ProduitsCommande {
    id: any;
    produitId: any;
    qte: any;
    commandeId: any;
    pu: any;
    total:any;
    tableId: Table;

    constructor(idcomde,produitId,qte,pu,tatleID =  null){
        this.id = id;
        this.produitId = produitId;
        this.qte = qte;
        this.pu = pu;
        this.total = parseInt(pu.trim()) *  qte;
        this.tableId = tatleID;
    }

}