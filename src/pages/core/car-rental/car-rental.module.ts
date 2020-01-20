import { NgModule, Component } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarRentalPage } from './car-rental';
import { CarRentalEditPage } from './edit/car-rental-edit';
import { CarRentalEndPage } from './end/car-rental-end';
import { NoleggioDocumentPage } from './noleggio-document/noleggio-document';
import { ComponentsModule } from '../../../components/components.module';
import { CarRentalComponentsModule } from './shared/components.module';
import { SinistriFormPage } from "./shared/sinistri-form/sinistri-form";
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { PraticheModalPage } from '../shared/pratiche-modal/pratiche-modal';


@NgModule({
  declarations: [
    CarRentalPage,
    CarRentalEditPage,
    CarRentalEndPage,
    NoleggioDocumentPage,
    SinistriFormPage,
    PraticheModalPage
  ],
  imports: [
    IonicPageModule.forChild(CarRentalPage),
    ComponentsModule,
    CarRentalComponentsModule,
    LazyLoadImageModule
  ],
  entryComponents: [
  	CarRentalPage,
    CarRentalEditPage,
    CarRentalEndPage,
    NoleggioDocumentPage,
    SinistriFormPage,
    PraticheModalPage
  ]
})
export class CarRentalPageModule {}
