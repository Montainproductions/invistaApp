import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddFuelPageRoutingModule } from './add-fuel-routing.module';

import { AddFuelPage } from './add-fuel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddFuelPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddFuelPage]
})
export class AddFuelPageModule {}
