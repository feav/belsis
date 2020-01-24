import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { UsersService } from "./services/users.service";
import  { AuthGuard } from './guards/auth.guard';


let home = 'login';

let user_exist = localStorage.getItem('userconnected');

if(user_exist){
  home = 'home';
  localStorage.setItem('recentLogged', "0");
}

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  { 
    path: 'table', 
    loadChildren: './table/table.module#TablePageModule' 
  },
  { 
    path: 'commandes', 
    loadChildren: './commandes/commandes.module#CommandesPageModule' 
  },
  { 
    path: 'stokcs', 
    loadChildren: './stokcs/stokcs.module#StokcsPageModule' 
  },{ 
    path: 'comptabilite', 
    loadChildren: './comptabilite/comptabilite.module#ComptabilitePageModule' 
  },
  { path: 'login', loadChildren: './user/login/login.module#LoginPageModule', canActivate: [AuthGuard] },
  { path: 'profile', loadChildren: './user/profile/profile.module#ProfilePageModule' },
  { path: 'commandes/new', loadChildren: './commandes/nouveau/nouveau.module#NouveauPageModule' },
  { path: 'modal-details', loadChildren: './table/modal-details/modal-details.module#ModalDetailsPageModule' },
  
  { path: 'choice-produit', loadChildren: './commandes/choice-produit/choice-produit.module#ChoiceProduitPageModule' },
  { path: 'general-settings', loadChildren: './pages/settings/general-settings/general-settings.module#GeneralSettingsPageModule' },
  { path: 'preparation', loadChildren: './commandes/preparation/preparation.module#PreparationPageModule' },
  { path: 'menu', loadChildren: './menu/menu.module#MenuPageModule' },
  { path: 'categorie', loadChildren: './categorie/categorie.module#CategoriePageModule' },
  { path: 'personnel', loadChildren: './pages/personnel/personnel.module#PersonnelPageModule' },
  { path: 'gestion-table', loadChildren: './pages/table/table.module#TablePageModule' }




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
