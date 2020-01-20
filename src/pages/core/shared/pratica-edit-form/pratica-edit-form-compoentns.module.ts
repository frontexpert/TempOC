import { NgModule } from '@angular/core';
import { IonicModule } from "ionic-angular";
import { ComponentsModule } from "../../../../components/components.module";
import { OutlookTabComponet } from './outlook-tab/outlook-tab';
import { QuoteTabComponent } from './quote-tab/quote-tab';
import { DocumentsTabComponent } from './documents-tab/documents-tab';
import { PaymentTabComponet } from './payment-tab/payment-tab';
import { PhotoTabComponet } from './photo-tab/photo-tab';
import { RentTabComponet } from './rent-tab/rent-tab';
import { PdfPreviewPageModule } from '../../shared/pdf-preview/pdf-preview.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { LongPressModule } from 'ionic-long-press';
import { QuotePrintModalPageModule } from '../quote-print-modal/quote-print-modal.module';
import { QuoteOptionsModalPageModule } from '../quote-options-modal/quote-options-modal.module';
import { AssegnaGaranteModalPageModule } from '../assegna-garante-modal/assegna-garante-modal.module';
import { GestioneAutonomaModalPageModule } from '../gestione-autonoma-modal/gestione-autonoma-modal.module';


@NgModule({
	declarations: [
    OutlookTabComponet,
    QuoteTabComponent,
    DocumentsTabComponent,
    PaymentTabComponet,
    PhotoTabComponet,
    RentTabComponet
  ],
	imports: [IonicModule,
    ComponentsModule,
    PdfPreviewPageModule,
    NgxChartsModule,
    LazyLoadImageModule,
    LongPressModule,
    QuotePrintModalPageModule,
    QuoteOptionsModalPageModule,
    AssegnaGaranteModalPageModule,
    GestioneAutonomaModalPageModule
  ],
	exports: [
    OutlookTabComponet,
    QuoteTabComponent,
    DocumentsTabComponent,
    PaymentTabComponet,
    PhotoTabComponet,
    RentTabComponet
  ]
})
export class PraticaEditFormComponentsModule {}
