import { Component, OnInit, Input } from '@angular/core';
import { IngrediantSelectPipe } from '../ingrediant-select.pipe';
import { PopoverController } from '@ionic/angular';
import { UtilsService } from '../../services/utils.service'
import * as $ from 'jquery';

@Component({
  selector: 'app-select-ingrediants',
  templateUrl: './select-ingrediants.component.html',
  styleUrls: ['./select-ingrediants.component.scss'],
})
export class SelectIngrediantsComponent implements OnInit {

	@Input()
	public parent:any;

	public filter:string;
	
	@Input()
	public ingrediants:Array<any>;
    public ingrediantPlat = new Array();
	@Input()
	public edit:boolean;

	constructor(public popoverController:PopoverController,private utilsService: UtilsService) {

	}

	ngOnInit() {

	}

	public pluss(index){
		this.ingrediants[index].quantite = this.ingrediants[index].quantite + 1;
	}

	public moinss(index){
		if (this.ingrediants[index].quantite != 0) 
			this.ingrediants[index].quantite = this.ingrediants[index].quantite - 1;
	}

	public ajoutGlobal(){
		 this.parent.ingrediants = this.ingrediants;
		 this.popoverController.dismiss();
	}

    public plus(index){
        console.log(index);
        let convert = index.split("_");
        let qte:any = "qte_"+convert[0];
        let self:any = $('.'+qte+'');
        let stock:any = convert[0]+"_stock";
        let selfStock:any = $('.'+stock+'').val();
        let oldQte:any = parseInt(self.val().trim());
        console.log(oldQte);
        console.log(selfStock);
        if(this.stockControl(selfStock,oldQte)){
            self.val( oldQte + 1);
        }else {
            let t:any = selfStock - 1;
            self.val(t);
        }

    }

    public moins(index){
        let convert = index.split("_");
        let qte:any = "qte_"+convert[0];
        let self:any = $('.'+qte+'');
        let oldQte:any = parseInt(self.val().trim());
        console.log(oldQte);
        if(oldQte >0){
            let g:any = oldQte - 1;
            self.val(g);
        }else {
            self.val( 1);
        }
    }
    public stockControl(stock,qte):boolean{
        console.log(stock);
        console.log(qte);
        if (stock > qte){
            return true
        }else {
            this.utilsService.presentToast('la quantité demandée '+qte+' est superieur a la quantité en stock '+stock, 2000, 'danger');
            return false;
        }
    }

    pushIngrediant(){
        var valeurs = [];
        $("input:checked[name=adder]").each(function () {
            valeurs.push($(this).val());
        });
        for (let i=0;i<valeurs.length;i++){
           // if(id === 0) {
                let interm: any = "qte_" + valeurs[i];
                let name: any = valeurs[i]+"_name";
                let qte: any = $('.' + interm + '').val();
                let prix = "prix_" + valeurs[i];
                let data = {
                    productId: valeurs[i],
                    qte: qte,
					name:$('.'+name+'').val(),
                    author: this.utilsService.curentUserInfo()[0].id
                }
                this.ingrediantPlat.push(data);

            //}
        }
        //console.log(ingrediantPlat);
		localStorage.setItem('ingrePlat',JSON.stringify(this.ingrediantPlat));

	}

}
