import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddKmSuccessPageRoutingModule } from './add-km-success-routing.module';

import { AddKmSuccessPage } from './add-km-success.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddKmSuccessPageRoutingModule
  ],
  declarations: [AddKmSuccessPage]
})
export class AddKmSuccessPageModule {}
