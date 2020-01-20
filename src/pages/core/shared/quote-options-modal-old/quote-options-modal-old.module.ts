import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuoteOptionsModalOldPage } from './quote-options-modal-old';
import { VeicoloOptions } from '../../../../models/general';
import { ComponentsModule } from '../../../../components/components.module';


@NgModule({
  declarations: [
    QuoteOptionsModalOldPage,
  ],
  imports: [
    IonicPageModule.forChild(QuoteOptionsModalOldPage),
    ComponentsModule
  ]
})
export class QuoteOptionsModalPageModule {}
