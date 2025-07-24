import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { APICallsPage } from './APICalls.page';

const routes: Routes = [
  {
    path: '',
    component: APICallsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class APICallsPageRoutingModule {}
