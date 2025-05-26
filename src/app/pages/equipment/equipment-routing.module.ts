import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EquipmentPage } from './equipment.page';

const routes: Routes = [
  {
    path: '',
    component: EquipmentPage
  },  {
    path: 'km',
    loadChildren: () => import('./km/km.module').then( m => m.KmPageModule)
  },
  {
    path: 'fuel',
    loadChildren: () => import('./fuel/fuel.module').then( m => m.FuelPageModule)
  },
  {
    path: 'maintenance',
    loadChildren: () => import('./maintenance/maintenance.module').then( m => m.MaintenancePageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquipmentPageRoutingModule {}
