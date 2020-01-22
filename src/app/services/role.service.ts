import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private roles =  ['serveur', 'admin', 'superadmin', 'gestionnaire', 'cuisinier', 'barman'];

  constructor() { }

  getAllRoles(){
  	return this.roles;
  }


}
