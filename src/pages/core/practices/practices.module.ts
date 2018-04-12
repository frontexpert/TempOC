import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PracticesPage } from './practices';
import { ComponentsModule } from '../../../components/components.module';
import { PraticaComponentsModule } from './shared/pratica-compoentns.module';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    PracticesPage,
  ],
  imports: [
    IonicPageModule.forChild(PracticesPage),
    ComponentsModule,
    PraticaComponentsModule,
    PipesModule
  ],
})
export class PracticesPageModule {}
