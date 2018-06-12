import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PracticeEditPage } from './practice-edit';
import { ComponentsModule } from '../../../../components/components.module';
import { PraticaFormComponentsModule } from '../../shared/pratica-form/pratica-form-components.module';

@NgModule({
  declarations: [
    PracticeEditPage
  ],
  imports: [
    IonicPageModule.forChild(PracticeEditPage),    
    ComponentsModule,
    PraticaFormComponentsModule
  ],
})
export class PracticeEditPageModule {}
