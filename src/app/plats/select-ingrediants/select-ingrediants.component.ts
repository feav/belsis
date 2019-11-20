import { Component, OnInit, Input } from '@angular/core';
import { IngrediantSelectPipe } from '../ingrediant-select.pipe';
import { PopoverController } from '@ionic/angular';


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

	@Input()
	public edit:boolean;

	constructor(public popoverController:PopoverController) {

	}

	ngOnInit() {

	}

	public plus(index){
		this.ingrediants[index].quantite = this.ingrediants[index].quantite + 1;
	}

	public moins(index){
		if (this.ingrediants[index].quantite != 0) 
			this.ingrediants[index].quantite = this.ingrediants[index].quantite - 1;
	}

	public ajoutGlobal(){
		 this.parent.ingrediants = this.ingrediants;
		 this.popoverController.dismiss();
	}

}
