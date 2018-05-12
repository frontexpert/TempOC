import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CorePage } from './core';
import { ComponentsModule } from '../../components/components.module';
import { ApertePageModule } from './aperte/aperte.module';
import { ChiusePageModule } from './chiuse/chiuse.module';
import { CarRentalPageModule } from './car-rental/car-rental.module';
import { PdfPreviewPageModule } from './shared/pdf-preview/pdf-preview.module';
import { SignatureModalPageModule } from './shared/signature-modal/signature-modal.module';
import { PreventiviPageModule } from './preventivi/preventivi.module';
import { InLavorazionePageModule } from './in-lavorazione/in-lavorazione.module';

@NgModule({
  declarations: [
    CorePage,
  ],
  imports: [
    IonicPageModule.forChild(CorePage),
    ComponentsModule,
    ApertePageModule,
    ChiusePageModule,
    PreventiviPageModule,
    CarRentalPageModule,
    InLavorazionePageModule,
    PdfPreviewPageModule,
    SignatureModalPageModule
  ],
})
export class CorePageModule {}
