import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InsertPlatePage } from './insert-plate';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
  declarations: [
    InsertPlatePage
  ],
  imports: [
    IonicPageModule.forChild(InsertPlatePage),    
    ComponentsModule,
  ],
})
export class InsertPlatePageModule {}
