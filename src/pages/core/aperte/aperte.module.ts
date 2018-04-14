import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApertePage } from './aperte';
import { InsertApertePage } from './insert/insert-aperte';
import { ComponentsModule } from '../../../components/components.module';
import { AperteComponentsModule } from './shared/aperte-components.module';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    ApertePage,
    InsertApertePage,
  ],
  entryComponents: [
    InsertApertePage,
  ],
  imports: [
    IonicPageModule.forChild(ApertePage),    
    ComponentsModule,
    AperteComponentsModule,
    PipesModule
  ],
})
export class ApertePageModule {}
