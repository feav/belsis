import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TablePage } from './table.page';
import { DetailsTableComponent } from './details-table/details-table.component';

const routes: Routes = [
  {
    path: '',
    component: TablePage
  },
  {
    path: 'details/:id',
    component: DetailsTableComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TablePage, DetailsTableComponent]
})
export class TablePageModule {}
