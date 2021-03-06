import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InsertPracticePage } from './insert-practice';
import { ComponentsModule } from '../../../../components/components.module';
import { PraticaFormComponentsModule } from '../../shared/pratica-form/pratica-form-components.module';

@NgModule({
  declarations: [
    InsertPracticePage
  ],
  imports: [
    IonicPageModule.forChild(InsertPracticePage),    
    ComponentsModule,
    PraticaFormComponentsModule
  ],
})
export class InsertPracticePageModule {}
