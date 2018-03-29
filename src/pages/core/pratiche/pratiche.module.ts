import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PratichePage } from './pratiche';

@NgModule({
  declarations: [
    PratichePage,
  ],
  imports: [
    IonicPageModule.forChild(PratichePage),
  ],
})
export class PratichePageModule {}
