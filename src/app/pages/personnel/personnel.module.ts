import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PersonnelPage } from './personnel.page';
import { AddPersonnelComponent } from './add-personnel/add-personnel.component';
import { DetailPersonnelComponent } from './detail-personnel/detail-personnel.component';

const routes: Routes = [
  {
    path: '',
    component: PersonnelPage
  },
  {
    path: 'new',
    component: AddPersonnelComponent,
  },
  {
    path: 'detial/:id',
    component: DetailPersonnelComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PersonnelPage, AddPersonnelComponent, DetailPersonnelComponent]
})
export class PersonnelPageModule {}
