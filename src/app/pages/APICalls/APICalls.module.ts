import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { APICallsPageRoutingModule } from './APICalls-routing.module';

import { APICallsPage } from './APICalls.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    APICallsPageRoutingModule,
  ],
  declarations: [
    APICallsPage,
  ]
})
export class APICallsPageModule {}