import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditMaintenancePage } from './edit-maintenance.page';

const routes: Routes = [
  {
    path: '',
    component: EditMaintenancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditMaintenancePageRoutingModule {}
