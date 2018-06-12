import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { InLavorazionePage } from './in-lavorazione';
import { ComponentsModule } from '../../../components/components.module';
import { PraticaFormComponentsModule } from '../shared/pratica-form/pratica-form-components.module';
import { PraticaEditFormComponentsModule } from '../shared/pratica-edit-form/pratica-edit-form-compoentns.module';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    InLavorazionePage
  ],
  imports: [
    IonicPageModule.forChild(InLavorazionePage),    
    ComponentsModule,
    PraticaFormComponentsModule,
    PraticaEditFormComponentsModule,
    PipesModule
  ],
})
export class InLavorazionePageModule {}
