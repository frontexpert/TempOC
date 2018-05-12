import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { InLavorazionePage } from './in-lavorazione';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    InLavorazionePage
  ],
  imports: [
    IonicPageModule.forChild(InLavorazionePage),    
    ComponentsModule
  ],
})
export class InLavorazionePageModule {}
