import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaintenancePage } from './maintenance.page';

const routes: Routes = [
  {
    path: '',
    component: MaintenancePage
  },  {
    path: 'add-maintenance',
    loadChildren: () => import('./add-maintenance/add-maintenance.module').then( m => m.AddMaintenancePageModule)
  },
  {
    path: 'add-maintenance-success',
    loadChildren: () => import('./add-maintenance-success/add-maintenance-success.module').then( m => m.AddMaintenanceSuccessPageModule)
  },
  {
    path: 'edit-maintenance',
    loadChildren: () => import('./edit-maintenance/edit-maintenance.module').then( m => m.EditMaintenancePageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenancePageRoutingModule {}
