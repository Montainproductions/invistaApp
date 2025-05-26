import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FuelPage } from './fuel.page';

const routes: Routes = [
  {
    path: '',
    component: FuelPage
  },  {
    path: 'add-fuel',
    loadChildren: () => import('./add-fuel/add-fuel.module').then( m => m.AddFuelPageModule)
  },
  {
    path: 'add-fuel-success',
    loadChildren: () => import('./add-fuel-success/add-fuel-success.module').then( m => m.AddFuelSuccessPageModule)
  },
  {
    path: 'edit-fuel',
    loadChildren: () => import('./edit-fuel/edit-fuel.module').then( m => m.EditFuelPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FuelPageRoutingModule {}
