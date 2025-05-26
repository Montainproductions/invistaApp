import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditKmPage } from './edit-km.page';

const routes: Routes = [
  {
    path: '',
    component: EditKmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditKmPageRoutingModule {}
