import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TableService } from './../services/table.service';
import {error} from 'util';

@Component({
  selector: 'app-table',
  templateUrl: './table.page.html',
  styleUrls: ['./table.page.scss'],
})
export class TablePage implements OnInit {

 	private tables : any;  
 	constructor(private router: Router, private tableService: TableService){
        //this.tableService.tableResto();
  	}
  ngOnInit() {

  	//this.tables = this.tableService.getTables();
  }
  ionViewWillEnter(){
      this.tables = this.tableService.tableResto();
  }
	public openTable(tab, tableId){
	    //this.router.naigate(['/table/details/' + tab.id]);
	  	this.router.navigate(['/table/details/'+tableId], {
	  		queryParams: {
		      tableId: tableId
		    }
	  	});
	}

}
