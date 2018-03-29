import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CorePage } from './core';
import { ComponentsModule } from '../../components/components.module';
import { PratichePageModule } from './pratiche/pratiche.module';
import { TemparioPageModule } from './tempario/tempario.module';
import { NoleggioPageModule } from './noleggio/noleggio.module';

@NgModule({
  declarations: [
    CorePage,
  ],
  imports: [
    IonicPageModule.forChild(CorePage),
    ComponentsModule,
    PratichePageModule,
    TemparioPageModule,
    NoleggioPageModule
  ],
})
export class CorePageModule {}
