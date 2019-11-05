import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-sorties',
  templateUrl: './list-sorties.component.html',
  styleUrls: ['./list-sorties.component.scss'],
})
export class ListSortiesComponent implements OnInit {

  private sorties:Array<any> ;

  constructor(private router: Router) { }

  ngOnInit() {

    this.sorties = [
      {
        id: 1,
        date: "10/10/2019",
        description:"rembourssement",
        montant: 10000
      },
      {
        id: 1,
        date: "10/10/2019",
        description:"Achat de marchandise",
        montant: 10000
      },
      {
        id: 1,
        date: "11/10/2019",
        description:"Fournisseurs",
        montant: 10000
      }
    ]

  }

  public setToEntrees(){
  	this.router.navigate(["/comptabilite/list-entrees"]);
  }

  public setToSatats(){
  	this.router.navigate(["/comptabilite"]);
  }

  search(){

  }

}
