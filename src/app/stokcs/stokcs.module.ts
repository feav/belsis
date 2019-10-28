import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StokcsPage               } from './stokcs.page';
import { AddProduitComponent      } from './add-produit/add-produit.component';
import { EditProduitComponent     } from './edit-produit/edit-produit.component';
import { DetailsProduitComponent  } from './details-produit/details-produit.component';


const routes: Routes = [
  {
    path: '',
    component: StokcsPage,
  },
  {
    path: 'add',
    component: AddProduitComponent,
  },
  {
    path: 'edit/:id',
    component: EditProduitComponent,
  },
  {
    path: 'details/:id',
    component: DetailsProduitComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StokcsPage, AddProduitComponent, EditProduitComponent, DetailsProduitComponent]
})
export class StokcsPageModule {}
