import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarRentalPage } from './car-rental';
import { CarRentalEditPage } from './edit/car-rental-edit';
import { ComponentsModule } from '../../../components/components.module';
import { CarRentalComponentsModule } from './shared/components.module';


@NgModule({
  declarations: [
    CarRentalPage,
    CarRentalEditPage
  ],
  imports: [
    IonicPageModule.forChild(CarRentalPage),
    ComponentsModule,
    CarRentalComponentsModule,
  ],
  entryComponents: [
  	CarRentalPage,
  	CarRentalEditPage
  ]
})
export class CarRentalPageModule {}
