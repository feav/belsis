import { Product } from './product.model';
import { Table } from './table.model';

export class Commande{
    id: any;
    pro: Product;
    quantityOrdered: any;
    quantityDelivered: any;
    totalAmount: any;
    table: Table;
    public commande =[[]];
    //public cmd =[[]];
    idcmd:number;
    constructor(id){
        this.idcmd = id;
        //this.newcmId();

    }
    curentUserInfo(){
        let curentcy = localStorage.getItem('userconnected');
        return JSON.parse(curentcy);
    }
    newcmId(){
        if(localStorage.getItem('commandes') == null){
            this.idcmd = 0;
        }else{
            this.idcmd = JSON.parse(localStorage.getItem('commandes')).length + 1;
        }
    }
    pushproduct(datas){
        let data =  {
            productId:parseInt(datas.productId),
            qte:parseInt(datas.qte),
            pu:parseInt(datas.pu),
            date:'15/11/2019',
            status:0,
            totalPrice:parseInt(datas.pu) * parseInt(datas.qte),
            tableId:0,
            author:this.curentUserInfo()[0].id
        }
        this.commande[this.idcmd].push(data);
    }
    pushproduct2(datas){
        let data =  {
            productId:parseInt(datas.productId),
            qte:parseInt(datas.qte),
            pu:parseInt(datas.pu),
            date:'15/11/2019',
            status:0,
            totalPrice:parseInt(datas.pu) * parseInt(datas.qte),
            tableId:0,
            author:this.curentUserInfo()[0].id
        }
        this.commande[0].push(data);
    }


}