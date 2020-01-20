import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AssegnaGaranteModalPage } from './assegna-garante-modal';
import { VeicoloOptions } from '../../../../models/general';
import { ComponentsModule } from '../../../../components/components.module';


@NgModule({
  declarations: [
    AssegnaGaranteModalPage,
  ],
  imports: [
    IonicPageModule.forChild(AssegnaGaranteModalPage),
    ComponentsModule
  ]
})
export class AssegnaGaranteModalPageModule {}
