import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Restaurant } from '../models/restaurant.model';
import { UtilsService } from './utils.service';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  public HOST_BASE: string = this.utilsService.getHostAddress();
  public API_BASE: string = `/api/restaurant/`;

	constructor(
		private http: HttpClient,
		private utilsService: UtilsService
	) { }

	// get the current restaurant
	public getRestaurant(): Observable<Restaurant>{
		return this.http.get<Restaurant>(`${ this.HOST_BASE + this.API_BASE }get-by-user`);
	}






}
