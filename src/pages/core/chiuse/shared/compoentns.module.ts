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
    LazyLoadImageModule
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
export class ChiuseComponentsModule {}
