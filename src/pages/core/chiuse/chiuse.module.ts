import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChiusePage } from './chiuse';
import { ComponentsModule } from '../../../components/components.module';
import { PipesModule } from '../../../pipes/pipes.module';
import { ChiuseComponentsModule } from './shared/compoentns.module';

@NgModule({
  declarations: [
    ChiusePage,
  ],
  imports: [
    IonicPageModule.forChild(ChiusePage),
    ComponentsModule,
    ChiuseComponentsModule,
    PipesModule
  ],
})
export class ChiusePageModule {}
