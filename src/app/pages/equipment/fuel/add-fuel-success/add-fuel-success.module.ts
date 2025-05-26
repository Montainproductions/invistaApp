import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddFuelSuccessPageRoutingModule } from './add-fuel-success-routing.module';

import { AddFuelSuccessPage } from './add-fuel-success.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddFuelSuccessPageRoutingModule
  ],
  declarations: [AddFuelSuccessPage]
})
export class AddFuelSuccessPageModule {}
