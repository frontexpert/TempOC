import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PracticesPage } from './practices';
import { ComponentsModule } from '../../../components/components.module';
import { CoreComponentsModule } from '../shared/core-compoentns.module';

@NgModule({
  declarations: [
    PracticesPage,
  ],
  imports: [
    IonicPageModule.forChild(PracticesPage),
    ComponentsModule,
    CoreComponentsModule
  ],
})
export class PracticesPageModule {}
