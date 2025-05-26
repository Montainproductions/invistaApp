import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditKmPageRoutingModule } from './edit-km-routing.module';

import { EditKmPage } from './edit-km.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditKmPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditKmPage]
})
export class EditKmPageModule {}
