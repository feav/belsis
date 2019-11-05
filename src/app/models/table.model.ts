export class Table {
	id: any;
	label: any;
	value: any;
	logo: any;
	color: any;
	serveur: any;
	etat: any;
	location: any;
	orders: any

	constructor(id){
		
		let color = [
 			{color:"green",value:"En cours"},
 			{color:"red",value:"Terminee"},
 			{color:"orange",value:"Annulee"}
 		];
 		let auteur = ["BIANCA","STEPHANIE","ELODIE","TRESOR"];
 		let location = ["Pres du Salon","Cote Gauche","Pres Cuisine","Allee droite"];

 		let index = Math.floor(Math.random() * color.length);

		this.id = id;
		this.label = 'Table ' + id;
		this.value = 0;
		this.logo = "/assets/logo-stock.svg";
		this.color = color[index].color;
		this.serveur = auteur[Math.floor(Math.random() * auteur.length)];
		this.etat = color[index].value;
		this.location = location[Math.floor(Math.random() * location.length)];
		this.orders = [];
	}

}