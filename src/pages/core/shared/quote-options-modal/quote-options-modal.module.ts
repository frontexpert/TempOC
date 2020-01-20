import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuoteOptionsModalPage } from './quote-options-modal';
import { VeicoloOptions } from '../../../../models/general';
import { ComponentsModule } from '../../../../components/components.module';


@NgModule({
  declarations: [
    QuoteOptionsModalPage,
  ],
  imports: [
    IonicPageModule.forChild(QuoteOptionsModalPage),
    ComponentsModule
  ]
})
export class QuoteOptionsModalPageModule {}
