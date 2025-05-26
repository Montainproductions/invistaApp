import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddFuelSuccessPage } from './add-fuel-success.page';

const routes: Routes = [
  {
    path: '',
    component: AddFuelSuccessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddFuelSuccessPageRoutingModule {}
