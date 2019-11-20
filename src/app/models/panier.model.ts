
export class PanierModel {

    produitId: any;
    qte: any;
    pu: any;
    total:any;
    tableId: any;
    restoID:any

    constructor(produitId,qte,pu,restoId,tatbleID = null){
        //this.id = id;
        this.produitId = produitId;
        this.qte = qte;
        this.pu = pu;
        this.total = parseInt(pu) *  qte;
        if (tatbleID != null){
            this.tableId =  parseInt(tatbleID);
        }else{
            this.tableId = null;
        }
        this.restoID = restoId;
    }

}