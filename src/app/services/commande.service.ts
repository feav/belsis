import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  public items:any;
  constructor() { 
  	this.items = [];
  }
}
