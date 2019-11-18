export class ProduitModel {
    id: any;
    restoId:any;
    name: any;
    pu: any;
    qte: any;
    url: any;
    catID:any;

    constructor(id, name, pu,qte,restoID,catID,url){
        this.id = id;
        this.name = name;
        this.pu = parseInt(pu);
        this.qte = parseInt(qte);
        this.restoId = parseInt(restoID);
        this.catID = parseInt(catID)
        this.url = url;
    }

}