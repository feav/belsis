import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {

	@Input()
	public parent:any;

	@Input()
	public filterParam:any;

	constructor(public popoverController:PopoverController) { }

	ngOnInit() {}

	public addOrRemove(categorie){
		categorie.actived = !categorie.actived;
	}

	public setFilter(){
		this.parent.filterParam = this.filterParam;
	}

	public annuler(){
		this.filterParam.searchInput = "";
		for (var i = 0; i < this.filterParam.categories.length; ++i) {
			this.filterParam.categories[i].actived = false;
		}
		this.setFilter();
		this.popoverController.dismiss();
	}

	public valider(){
		this.setFilter();
		this.popoverController.dismiss();
	}

}
