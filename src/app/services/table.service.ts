import { Injectable } from '@angular/core';
import { Table } from './../models/table.model';
import {reject} from 'q';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor() { }

  initializeTables(tableNumber: number = 4){
  	
  	const tables = [];

  	for(let i=0; i < 12; i++){
  		if(i<=3){
            let table = new Table(i+1);
            table.restoId = 1;
            tables.push(table);
		}
		if (i >= 3 && i <= 6){
            let table = new Table(i+1);
            table.restoId = 2;
            tables.push(table);
		}
        if (i >= 6 && i <= 9){
            let table = new Table(i+1);
            table.restoId = 3;
            tables.push(table);
        }
    }
  	//console.log(tables);

  	if(localStorage.getItem('tables') == null)
  		localStorage.setItem('tables', JSON.stringify(tables));

  }
  curentUserInfo(){
        let curentcy = localStorage.getItem('userconnected');
        return JSON.parse(curentcy);
  }




  getTables(){
  	return JSON.parse(localStorage.getItem('tables'));
  }

    tableResto(){
            let tables = localStorage.getItem('tables');
            let restoId = this.curentUserInfo()[0].restoId;
            let tableResto = new Array();
            //console.log(restoId);
            let conv = JSON.parse(tables);

            for (let i = 0; i < conv.length;i++){
                if (conv[i].restoId === restoId){
                    tableResto.push( conv[i]);
				    console.log(conv[i]);
                }
            }
            return tableResto;
    }


}
