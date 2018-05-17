import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChiusePage } from './chiuse';
import { PracticeEditPage } from './edit/practice-edit';
import { ComponentsModule } from '../../../components/components.module';
import { PipesModule } from '../../../pipes/pipes.module';
import { ChiuseComponentsModule } from './shared/compoentns.module';
import { PraticaFormComponentsModule } from '../shared/pratica-form/pratica-form-components.module';

@NgModule({
  declarations: [
    ChiusePage,
    PracticeEditPage
  ],
  entryComponents: [
  	PracticeEditPage
  ],
  imports: [
    IonicPageModule.forChild(ChiusePage),
    ComponentsModule,
    ChiuseComponentsModule,
    PipesModule,
    PraticaFormComponentsModule
  ],
})
export class ChiusePageModule {}
