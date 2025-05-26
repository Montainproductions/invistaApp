import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddKmPageRoutingModule } from './add-km-routing.module';

import { AddKmPage } from './add-km.page';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddKmPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddKmPage]
})
export class AddKmPageModule {}
