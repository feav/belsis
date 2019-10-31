import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.page.html',
  styleUrls: ['./table.page.scss'],
})
export class TablePage implements OnInit {

 	private tables : Array<any> = [];  
 	constructor(private router: Router){
 		let color = [
 			{color:"green",value:"En cours"},
 			{color:"red",value:"Terminee"},
 			{color:"orange",value:"Annulee"}];
 		let auteur = ["BIANCA","STEPHANIE","ELODIE","TRESOR"];
 		let location = ["Pres du Salon","Cote Gauche","Pres Cuisine","Allee droite"];
    	for (let i = 1; i < 11; ) {
    		let tmp = [];
    		let index = Math.floor(Math.random() * color.length);
    		for (let j = 1; j <= 3; j++) {
		      	tmp.push({
			        label: 'Table ' + i,
			        value:  Math.floor(Math.random() * 10),
			        logo: "/assets/logo-stock.svg",
			        color:color[index].color,
			        serveur:auteur[Math.floor(Math.random() * auteur.length)],
			        etat:color[index].value,
			        location : location[Math.floor(Math.random() * location.length)]
			      });
		      i++;
		    }
		    this.tables.push(tmp);
    	}
    	console.log(this.tables);
  	}
	  ngOnInit() {
	  }

	public openTable(tab){
	    //this.router.naigate(['/table/details/' + tab.id]);
	  	this.router.navigate(['/table/details/10']);
	}

}
