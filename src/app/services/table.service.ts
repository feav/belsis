import { Injectable } from '@angular/core';
import { Table } from './../models/table.model';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor() { }

  initializeTables(tableNumber: number = 12){
  	
  	const tables = [];

  	for(let i=0; i < tableNumber; i++){
  		let table = new Table(i+1);
  		tables.push(table);
  	}

  	if(localStorage.getItem('tables') == null)
  		localStorage.setItem('tables', JSON.stringify(tables));
  }

  getTables(){
  	return JSON.parse(localStorage.getItem('tables'));
  }


}
