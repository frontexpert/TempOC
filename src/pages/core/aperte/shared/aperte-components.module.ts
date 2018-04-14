import { NgModule } from '@angular/core';
import { IonicModule } from "ionic-angular";
import { ComponentsModule } from "../../../../components/components.module";
import { ClienteTabComponet } from './cliente-tab/cliente-tab';
import { VeicoloTabComponet } from './veicolo-tab/veicolo-tab';
import { SinistroTabComponet } from './sinistro-tab/sinistro-tab';
import { ControparteTabComponet } from './controparte-tab/controparte-tab';

@NgModule({
	declarations: [
    VeicoloTabComponet,
    ClienteTabComponet,   
    SinistroTabComponet, 
    ControparteTabComponet
  ],
	imports: [IonicModule,
    ComponentsModule,
  ],
	exports: [
    VeicoloTabComponet,
    ClienteTabComponet,
    SinistroTabComponet,
    ControparteTabComponet
  ]
})
export class AperteComponentsModule {}
