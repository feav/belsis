import { Component, OnInit } from '@angular/core';
import {JSON_CONFIG_FILENAME} from 'tslint/lib/configuration';
//import { } from '../services/'
@Component({
  selector: 'app-plats',
  templateUrl: './plats.page.html',
  styleUrls: ['./plats.page.scss'],
})
export class PlatsPage implements OnInit {
    public platCat: any[] = [
        {
            id: 1,
            name: 'EntreĂ©',
            description: 'lorem isum 237 product',
        },
        {
            id: 2,
            name: 'sortie',
            description: 'lorem isum 237 product',
        },
        {
            id: 3,
            name: 'desserts',
            description: 'lorem isum 237 product',
        },
        {
            id: 4,
            name: 'biossons',
            description: 'lorem isum 237 product',
        }
    ];
  constructor() {
    localStorage.setItem('catplat',JSON.stringify(this.platCat));
  }

  ngOnInit() {
  }

}
