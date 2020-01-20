import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GestioneAutonomaModalPage } from './gestione-autonoma-modal';
import { VeicoloOptions } from '../../../../models/general';
import { ComponentsModule } from '../../../../components/components.module';


@NgModule({
  declarations: [
    GestioneAutonomaModalPage,
  ],
  imports: [
    IonicPageModule.forChild(GestioneAutonomaModalPage),
    ComponentsModule
  ]
})
export class GestioneAutonomaModalPageModule {}
