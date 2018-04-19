import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DatePipe } from '@angular/common';

import { PdfPreviewPage } from './pdf-preview';

@NgModule({
  declarations: [
    PdfPreviewPage,
  ],
  imports: [
    IonicPageModule.forChild(PdfPreviewPage),
    PdfViewerModule,
  ],
  providers: [
    DatePipe
  ]
})
export class PdfPreviewPageModule {}
