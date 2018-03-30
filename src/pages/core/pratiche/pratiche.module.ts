import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PratichePage } from './pratiche';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    PratichePage,
  ],
  imports: [
    IonicPageModule.forChild(PratichePage),
    ComponentsModule
  ],
})
export class PratichePageModule {}
