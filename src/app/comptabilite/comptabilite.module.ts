import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ComptabilitePage } from './comptabilite.page';
import { ListEntreesComponent } from './list-entrees/list-entrees.component';
import { ListSortiesComponent } from './list-sorties/list-sorties.component';

const routes: Routes = [
  {
    path: '',
    component: ComptabilitePage
  },
  {
    path: 'list-entrees',
    component: ListEntreesComponent
  },
  {
    path: 'list-sorties',
    component: ListSortiesComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ComptabilitePage, ListSortiesComponent, ListEntreesComponent]
})
export class ComptabilitePageModule {}
