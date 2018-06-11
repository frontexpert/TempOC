import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApertePage } from './aperte';
import { ComponentsModule } from '../../../components/components.module';
import { PraticaFormComponentsModule } from '../shared/pratica-form/pratica-form-components.module';
import { PipesModule } from '../../../pipes/pipes.module';
import { TargaPage } from './targa/targa';

@NgModule({
  declarations: [
    ApertePage,
    TargaPage
  ],
  entryComponents: [
    TargaPage
  ],
  imports: [
    IonicPageModule.forChild(ApertePage),    
    ComponentsModule,
    PraticaFormComponentsModule,
    PipesModule
  ],
})
export class ApertePageModule {}
