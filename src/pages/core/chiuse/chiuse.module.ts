import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChiusePage } from './chiuse';
import { ComponentsModule } from '../../../components/components.module';
import { PipesModule } from '../../../pipes/pipes.module';
import { PraticaEditFormComponentsModule } from '../shared/pratica-edit-form/pratica-edit-form-compoentns.module';
import { PraticaFormComponentsModule } from '../shared/pratica-form/pratica-form-components.module';

@NgModule({
  declarations: [
    ChiusePage,
  ],
  imports: [
    IonicPageModule.forChild(ChiusePage),
    ComponentsModule,
    PraticaEditFormComponentsModule,
    PipesModule,
    PraticaFormComponentsModule
  ],
})
export class ChiusePageModule {}
