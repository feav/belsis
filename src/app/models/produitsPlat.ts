
export class ProduitsPlat{
    produitId: any;
    qte: any;
    platId: any;
    restoId:any;
    name: any;
    constructor(platId,produitId,qte,restoId,produitName){
        this.platId = parseInt(platId);
        this.produitId = parseInt(produitId);
        this.qte = parseInt(qte);
        this.restoId = parseInt(restoId);
        this.name = produitName;
    }

}