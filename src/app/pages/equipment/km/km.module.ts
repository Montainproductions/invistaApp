import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KmPageRoutingModule } from './km-routing.module';

import { KmPage } from './km.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KmPageRoutingModule
  ],
  declarations: [KmPage]
})
export class KmPageModule {}
