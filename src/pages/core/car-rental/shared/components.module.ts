import { NgModule } from '@angular/core';
import { IonicModule } from "ionic-angular";
import { ComponentsModule } from "../../../../components/components.module";
import { ConsegnaATabComponent } from "./consegna-a-tab/consegna-a-tab";
import { DettaglioTabComponent} from "./dettaglio-tab/dettaglio-tab";
import { StatoVeicoloTabComponent } from "./stato-veicolo-tab/stato-veicolo-tab";
import { UtilizzatoreTabComponent } from "./utilizzatore-tab/utilizzatore-tab";
import { Utilizzatore2TabComponent } from "./utilizzatore-2-tab/utilizzatore-2-tab";
import { RientroTabComponent } from "./rientro-tab/rientro-tab";
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { LongPressModule } from 'ionic-long-press';



@NgModule({
	declarations: [
    ConsegnaATabComponent,
    DettaglioTabComponent,
    StatoVeicoloTabComponent,
    UtilizzatoreTabComponent,
    Utilizzatore2TabComponent,
    RientroTabComponent
  ],
	imports: [IonicModule,
    ComponentsModule,
    LazyLoadImageModule,
    LongPressModule
  ],
  exports: [    
    ConsegnaATabComponent,
    DettaglioTabComponent,
    StatoVeicoloTabComponent,
    UtilizzatoreTabComponent,
    Utilizzatore2TabComponent,
    RientroTabComponent
  ]
})
export class CarRentalComponentsModule {}
