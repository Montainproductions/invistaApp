import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddMaintenancePageRoutingModule } from './add-maintenance-routing.module';

import { AddMaintenancePage } from './add-maintenance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddMaintenancePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddMaintenancePage]
})
export class AddMaintenancePageModule {}
