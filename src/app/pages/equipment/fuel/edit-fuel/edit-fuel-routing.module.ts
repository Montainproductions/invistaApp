import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditFuelPage } from './edit-fuel.page';

const routes: Routes = [
  {
    path: '',
    component: EditFuelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditFuelPageRoutingModule {}
