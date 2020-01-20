import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuotePrintModalPage } from './quote-print-modal';


@NgModule({
  declarations: [
    QuotePrintModalPage,
  ],
  imports: [
    IonicPageModule.forChild(QuotePrintModalPage)
  ],
})
export class QuotePrintModalPageModule {}
