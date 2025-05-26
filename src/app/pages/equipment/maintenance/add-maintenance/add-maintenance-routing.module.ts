import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddMaintenancePage } from './add-maintenance.page';

const routes: Routes = [
  {
    path: '',
    component: AddMaintenancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddMaintenancePageRoutingModule {}
