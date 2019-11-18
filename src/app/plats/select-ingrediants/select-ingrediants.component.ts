import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-select-ingrediants',
  templateUrl: './select-ingrediants.component.html',
  styleUrls: ['./select-ingrediants.component.scss'],
})
export class SelectIngrediantsComponent implements OnInit {

	@Input()
	public parent:any;
	
	@Input()
	public ingrediants:Array<any>;

	constructor() {

	}

	ngOnInit() {

	}

}
