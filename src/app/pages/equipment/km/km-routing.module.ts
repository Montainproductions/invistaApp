import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KmPage } from './km.page';

const routes: Routes = [
  {
    path: '',
    component: KmPage
  },  {
    path: 'add-km',
    loadChildren: () => import('./add-km/add-km.module').then( m => m.AddKmPageModule)
  },
  {
    path: 'add-km-success',
    loadChildren: () => import('./add-km-success/add-km-success.module').then( m => m.AddKmSuccessPageModule)
  },
  {
    path: 'edit-km',
    loadChildren: () => import('./edit-km/edit-km.module').then( m => m.EditKmPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KmPageRoutingModule {}
