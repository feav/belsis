import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-entrees',
  templateUrl: './list-entrees.component.html',
  styleUrls: ['./list-entrees.component.scss'],
})
export class ListEntreesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {

    this.entrees = [
      {
        id: 1,
        date: "10/10/2019",
        description:"Vante de poulets",
        montant: 10000
      },
      {
        id: 1,
        date: "10/10/2019",
        description:"Vente de nouritures",
        montant: 10000
      },
      {
        id: 1,
        date: "11/10/2019",
        description:"Vente de jus de fruit",
        montant: 10000
      }
    ];

  }

  public setToSorties(){
  	this.router.navigate(["/comptabilite/list-sorties"]);
  }

  public setToSatats(){
  	this.router.navigate(["/comptabilite"]);
  }

}
