import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddKmSuccessPage } from './add-km-success.page';

const routes: Routes = [
  {
    path: '',
    component: AddKmSuccessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddKmSuccessPageRoutingModule {}
