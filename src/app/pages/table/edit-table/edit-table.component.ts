import { Component, OnInit, Input } from '@angular/core';

import { UtilsService } from "./../../../services/utils.service";
import { TableService } from "./../../../services/table.service";
import { Table } from "./../../../models/table.model";
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-table',
  templateUrl: './edit-table.component.html',
  styleUrls: ['./edit-table.component.scss'],
})
export class EditTableComponent implements OnInit {

  
  @Input() public table: Table = new Table();
  @Input() public label: string = '';

  constructor(
  	private tableService: TableService,
  	private utilService: UtilsService,
  	private modalController: ModalController
  ) { }

  ngOnInit() {
  	this.loadLabel();
  }

  closeModal(){
	this.modalController.dismiss(0);
  }

  formIsClean(){
        let bad = true;
        if(this.table.nom == ''){
            this.utilService.presentToast("Nom non defini", 2000, "warning");
            bad = false;
        }
        if(this.table.description == '' ){
            this.utilService.presentToast("Description non definie", 2000, "warning");
            // bad = false;
        }
        if(!this.table.numero){
            this.utilService.presentToast("Numéro non definie", 2000, "warning");
            // bad = false;
        }
        return true;
    }

    addOrUpdate(){

    	if(!this.formIsClean()) return;

    	this.utilService.presentLoading(this.label + "la table");


    	if(!this.table.id){
    		this.label = 'Ajouter';
    		this.addTable();
    	}else{
			this.label = 'Modifier';
			this.updateTable();
    	}


    }

    addTable() {

        this.table.nom = this.table.name; // Pour enregistrer l'objet c'est nom et pour récupèrer c'est name
        this.tableService.saveTable(this.table)
        	.subscribe(
        		data => {
        			console.log(data);
        			this.utilService.dismissLoading();
        			this.modalController.dismiss(1);
        		},
        		error => {
        			console.log(error);
        			this.utilService.dismissLoading();
        		}
        	);
    }

    updateTable(){
    	
    	this.table.nom = this.table.name; // Pour enregistrer l'objet c'est nom et pour récupèrer c'est name
    	this.table.table_id = this.table.id;

    	this.tableService.updateTable(this.table)
    		.subscribe(
    			data => {
					console.log(data);
					this.modalController.dismiss(1);
    			},
    			error => {
    				console.log(error);
    			}
    		);
    }

    loadLabel() {
    	if(!this.table.id){
    		this.label = 'Ajouter';
		}else{
			this.label = 'Modifier';
		}
    }

}
