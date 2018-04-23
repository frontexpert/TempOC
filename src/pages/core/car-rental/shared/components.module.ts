import { NgModule } from '@angular/core';
import { IonicModule } from "ionic-angular";
import { ComponentsModule } from "../../../../components/components.module";
import { ConsegnaATabComponent } from "./consegna-a-tab/consegna-a-tab";
import { DettaglioTabComponent} from "./dettaglio-tab/dettaglio-tab";
import { StatoVeicoloTabComponent } from "./stato-veicolo-tab/stato-veicolo-tab";
import { UtilizzatoreTabComponent } from "./utilizzatore-tab/utilizzatore-tab";
import { Utilizzatore2TabComponent } from "./utilizzatore-2-tab/utilizzatore-2-tab";



@NgModule({
	declarations: [
    ConsegnaATabComponent,
    DettaglioTabComponent,
    StatoVeicoloTabComponent,
    UtilizzatoreTabComponent,
    Utilizzatore2TabComponent
  ],
	imports: [IonicModule,
    ComponentsModule,
  ],
  exports: [    
    ConsegnaATabComponent,
    DettaglioTabComponent,
    StatoVeicoloTabComponent,
    UtilizzatoreTabComponent,
    Utilizzatore2TabComponent
  ]
})
export class CarRentalComponentsModule {}
