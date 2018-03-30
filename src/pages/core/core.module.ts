import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CorePage } from './core';
import { ComponentsModule } from '../../components/components.module';
import { PracticesPageModule } from './practices/practices.module';
import { TemparioPageModule } from './tempario/tempario.module';
import { RentalPageModule } from './rental/rental.module';
import { CoreComponentsModule } from './shared/core-compoentns.module';

@NgModule({
  declarations: [
    CorePage,
  ],
  imports: [
    IonicPageModule.forChild(CorePage),
    ComponentsModule,
    CoreComponentsModule,
    PracticesPageModule,
    TemparioPageModule,
    RentalPageModule
  ],
})
export class CorePageModule {}
