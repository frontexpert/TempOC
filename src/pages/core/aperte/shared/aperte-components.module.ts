import { NgModule } from '@angular/core';
import { IonicModule } from "ionic-angular";
import { ComponentsModule } from "../../../../components/components.module";
import { ClienteTabComponent } from './cliente-tab/cliente-tab';
import { VeicoloTabComponent } from './veicolo-tab/veicolo-tab';
import { SinistroTabComponent } from './sinistro-tab/sinistro-tab';
import { ControparteTabComponent } from './controparte-tab/controparte-tab';

@NgModule({
	declarations: [
    VeicoloTabComponent,
    ClienteTabComponent,   
    SinistroTabComponent, 
    ControparteTabComponent
  ],
	imports: [IonicModule,
    ComponentsModule,
  ],
	exports: [
    VeicoloTabComponent,
    ClienteTabComponent,
    SinistroTabComponent,
    ControparteTabComponent
  ]
})
export class AperteComponentsModule {}
