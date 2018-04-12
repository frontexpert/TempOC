import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApertePage } from './aperte';
import { ComponentsModule } from '../../../components/components.module';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    ApertePage,
  ],
  imports: [
    IonicPageModule.forChild(ApertePage),
    ComponentsModule,
    PipesModule
  ],
})
export class ApertePageModule {}
