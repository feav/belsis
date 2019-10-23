import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CommandesPage } from './commandes.page';
import { AddProduitComponent } from './add-produit/add-produit.component';

const routes: Routes = [
  {
    path: '',
    component: CommandesPage
  },
  {
    path: 'add',
    component: AddProduitComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CommandesPage, AddProduitComponent]
})
export class CommandesPageModule {}
