import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

let home = 'login';

let user_exist = localStorage.getItem('user');
if(user_exist){
  home = 'home';
  localStorage.setItem('recentLogged', "0");
}
console.log(home)
const routes: Routes = [
  {
    path: '',
    redirectTo: home,
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
  { path: 'login', loadChildren: './user/login/login.module#LoginPageModule' },
  { path: 'profile', loadChildren: './user/profile/profile.module#ProfilePageModule' },
  { path: 'commandes/new', loadChildren: './commandes/nouveau/nouveau.module#NouveauPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
