import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Globals } from '../../../../../shared/globals';
import { Options, CompleteListItem } from '../../../../../models/general';
import { GeneralProvider } from '../../../../../providers/general';

@Component({
  selector: 'controparte-tab',
  templateUrl: 'controparte-tab.html'
})
export class ControparteTabComponent {

  datiVeicolo: any;

  @Output() onNextTab: EventEmitter<any> = new EventEmitter();

  @Output() onBackTab: EventEmitter<any> = new EventEmitter();

  @Input() pratica: any;

  @Input('options')
  get options(): Options {
  	return this.innerOptionsValue;
  }
  set options(v: Options) {
  	if (v !== this.innerOptionsValue) {
  		this.innerOptionsValue = v;
      this.tipologiaVeicoloList = this.globals.parseArrayToSelectList(v.TipologieVeicolo) || []; 
      console.log('ControparteTab. Set options controparte');
      console.log(this.innerOptionsValue); 	  		
  	}
  }
  private innerOptionsValue: Options;

  tipologiaVeicoloList: Array<CompleteListItem> = [];

  constructor(public globals: Globals, private generalProvider: GeneralProvider) {
    
  }

  checkDatiVeicolo() {

    this.globals.showLoading().then(() => {
      this.generalProvider.callTargaService(this.pratica.P2_Targa, this.innerOptionsValue.TipoID).then((res: any) => {
        this.globals.hideLoading();

        console.log('ControparteTab. callTargaService response: ', res);

        this.datiVeicolo = res;
        this.pratica.P2_Marca = this.datiVeicolo.marca;
        this.pratica.P2_Modello = this.datiVeicolo.modello;

        if(this.datiVeicolo.assicurato == 1)
        {
          this.pratica.P2_Assicurazione = this.datiVeicolo.CompagniaAssicurazione;
          this.pratica.P2_ScadenzaPolizza = this.datiVeicolo.DataScadenzaPolizza;
        } else {
          this.pratica.P2_Assicurazione = this.datiVeicolo.StatoAssicurazione;
        }

      })
      .catch(err => {
        console.log('VeicoloTab. callTargaService error: ', err);
        this.globals.hideLoading();
      });
    });

    console.log("ControparteTab. callTargaService...");
  }

  verifica() {
    return true;
  }
    
  
}