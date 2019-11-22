export class PlatModel{
    id: any;
    name:any;
    prix:any;
    restoId:any;
    qte:any;
    //tableId:any;
    catId:any;
    constructor(id,name,prix,restoId,catId,qte = 1){
        this.id = id;
        ///this.tableId = tableId;
        this.name = name;
        this.prix = prix;
        this.restoId = restoId;
        this.catId = catId;
        this.qte = qte;
    }
}