import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarRentalPage } from './car-rental';

@NgModule({
  declarations: [
    CarRentalPage,
  ],
  imports: [
    IonicPageModule.forChild(CarRentalPage),
  ],
})
export class CarRentalPageModule {}
