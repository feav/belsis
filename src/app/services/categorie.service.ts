import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  constructor() { }

  public getAll():Array<any>{
  	return [
			{
				nom: "Fruit",
				actived: false
			},
			{
				nom: "Legume",
				actived: false
			},
			{
				nom: "Viande",
				actived: false
			},
			{
				nom: "Céréal",
				actived: false
			}
		];
  }

}
