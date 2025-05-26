import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddFuelPage } from './add-fuel.page';

const routes: Routes = [
  {
    path: '',
    component: AddFuelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddFuelPageRoutingModule {}
