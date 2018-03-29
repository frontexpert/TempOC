import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TemparioPage } from './tempario';

@NgModule({
  declarations: [
    TemparioPage,
  ],
  imports: [
    IonicPageModule.forChild(TemparioPage),
  ],
})
export class TemparioPageModule {}
