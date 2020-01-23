import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ComptabilitePage } from './comptabilite.page';

const routes: Routes = [
  {
    path: '',
    component: ComptabilitePage,
    children: [
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ComptabilitePage]
})
export class ComptabilitePageModule {}
