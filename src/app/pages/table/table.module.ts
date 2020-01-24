import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TablePage } from './table.page';
import { EditTableComponent } from './edit-table/edit-table.component';


const routes: Routes = [
  {
    path: '',
    component: TablePage
  },
  {
    path: 'add',
    component: EditTableComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TablePage, EditTableComponent]
})
export class TablePageModule {}
