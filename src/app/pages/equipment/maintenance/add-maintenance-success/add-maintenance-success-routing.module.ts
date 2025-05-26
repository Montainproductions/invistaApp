import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddMaintenanceSuccessPage } from './add-maintenance-success.page';

const routes: Routes = [
  {
    path: '',
    component: AddMaintenanceSuccessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddMaintenanceSuccessPageRoutingModule {}
