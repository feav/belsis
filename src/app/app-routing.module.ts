import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UsersService } from "./services/users.service";

let home = 'login';

let user_exist = localStorage.getItem('recentLogged');
if(user_exist == 'null' || user_exist == null ){
  home = 'home';
  localStorage.setItem('recentLogged', "0");
}else{
  home = 'login';
}
console.log(home)
const routes: Routes = [
  {
    path: '',
    redirectTo: home,
    pathMatch: 'full'
  },
  { path: 'login', loadChildren: './user/login/login.module#LoginPageModule' },
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
  { path: 'login', loadChildren: './user/login/login.module#LoginPageModule' },
  { path: 'profile', loadChildren: './user/profile/profile.module#ProfilePageModule' },
  { path: 'commandes/new', loadChildren: './commandes/nouveau/nouveau.module#NouveauPageModule' },
  { path: 'modal-details', loadChildren: './table/modal-details/modal-details.module#ModalDetailsPageModule' },
  { path: 'panier', loadChildren: './commandes/panier/panier.module#PanierPageModule' },
  { path: 'detail', loadChildren: './commandes/detail/detail.module#DetailPageModule' },

  { path: 'plats', loadChildren: './plats/plats.module#PlatsPageModule' },
  { path: 'register', loadChildren: './auth/register/register.module#RegisterPageModule' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
