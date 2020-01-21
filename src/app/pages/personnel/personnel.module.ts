import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PersonnelPage } from './personnel.page';
import { AddPersonnelComponent } from './add-personnel/add-personnel.component';

const routes: Routes = [
  {
    path: '',
    component: PersonnelPage
  },
  {
    path: 'new',
    component: AddPersonnelComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PersonnelPage, AddPersonnelComponent]
})
export class PersonnelPageModule {}
