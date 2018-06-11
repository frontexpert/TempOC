import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewPracticePage } from './new-practice';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
  declarations: [
    NewPracticePage
  ],
  imports: [
    IonicPageModule.forChild(NewPracticePage),    
    ComponentsModule,
  ],
})
export class NewPracticePageModule {}
