import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditMaintenancePageRoutingModule } from './edit-maintenance-routing.module';

import { EditMaintenancePage } from './edit-maintenance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditMaintenancePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditMaintenancePage]
})
export class EditMaintenancePageModule {}
