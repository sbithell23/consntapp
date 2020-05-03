import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddRecordPageRoutingModule } from './add-record-routing.module';

import { AddRecordPage } from './add-record.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, 
    ComponentsModule,
    AddRecordPageRoutingModule
  ],
  declarations: []
})
export class AddRecordPageModule {}
