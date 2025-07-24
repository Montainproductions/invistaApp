import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddMaintenanceSuccessPageRoutingModule } from './add-maintenance-success-routing.module';

import { AddMaintenanceSuccessPage } from './add-maintenance-success.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddMaintenanceSuccessPageRoutingModule
  ],
  declarations: [AddMaintenanceSuccessPage]
})

export class AddMaintenanceSuccessPageModule {}
