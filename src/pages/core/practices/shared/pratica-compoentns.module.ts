import { NgModule } from '@angular/core';
import { IonicModule } from "ionic-angular";
import { ComponentsModule } from "../../../../components/components.module";
import { OutlookTabComponet } from './outlook-tab/outlook-tab';
import { BudgetsTabComponent } from './budgets-tab/budgets-tab';
import { DocumentsTabComponent } from './documents-tab/documents-tab';
import { PaymentTabComponet } from './payment-tab/payment-tab';
import { PhotoTabComponet } from './photo-tab/photo-tab';
import { RentTabComponet } from './rent-tab/rent-tab';
import { PdfPreviewPageModule } from '../../pdf-preview/pdf-preview.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
	declarations: [
    OutlookTabComponet,
    BudgetsTabComponent,
    DocumentsTabComponent,
    PaymentTabComponet,
    PhotoTabComponet,
    RentTabComponet
  ],
	imports: [IonicModule,
    ComponentsModule,
    PdfPreviewPageModule,
    NgxChartsModule
  ],
	exports: [
    OutlookTabComponet,
    BudgetsTabComponent,
    DocumentsTabComponent,
    PaymentTabComponet,
    PhotoTabComponet,
    RentTabComponet
  ]
})
export class PraticaComponentsModule {}
