import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { PlatsComponent } from './plats/plats.component';
import { EntreesComponent } from './entrees/entrees.component';
import { DessertsComponent } from './desserts/desserts.component';
import { BoissonsComponent } from './boissons/boissons.component';
import { FiltersComponent } from './filters/filters.component';
import { AddProduitComponent } from './add-produit/add-produit.component';
import { SelectIngrediantsComponent } from './select-ingrediants/select-ingrediants.component';




import { IonicModule } from '@ionic/angular';

import { PlatsPage } from './plats.page';
import { IngrediantSelectPipe } from './ingrediant-select.pipe';

const routes: Routes = [
  {
    path: '',
    component: PlatsPage,
    children: [
      {
        path: 'entrees',
        component: EntreesComponent
      },
      {
        path: 'desserts',
        component: DessertsComponent
      },
      {
        path: 'plats',
        component: PlatsComponent
      },
      {
        path: 'boissons',
        component: BoissonsComponent
      },
      {
        path: 'add',
        component: AddProduitComponent
      }
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
  declarations: [PlatsPage, FiltersComponent, BoissonsComponent, PlatsComponent, 
                 DessertsComponent, EntreesComponent, AddProduitComponent, 
                 SelectIngrediantsComponent, IngrediantSelectPipe],
  exports:[FiltersComponent, SelectIngrediantsComponent],
  entryComponents:[SelectIngrediantsComponent, FiltersComponent]
})
export class PlatsPageModule {}
