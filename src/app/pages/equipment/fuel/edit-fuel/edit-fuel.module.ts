import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditFuelPageRoutingModule } from './edit-fuel-routing.module';

import { EditFuelPage } from './edit-fuel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditFuelPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditFuelPage]
})
export class EditFuelPageModule {}
