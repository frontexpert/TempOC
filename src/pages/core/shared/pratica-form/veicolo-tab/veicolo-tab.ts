import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Globals } from '../../../../../shared/globals';
import { Options, CompleteListItem } from '../../../../../models/general';
import { GeneralProvider } from '../../../../../providers/general';

@Component({
  selector: 'veicolo-tab',
  templateUrl: 'veicolo-tab.html'
})
export class VeicoloTabComponent {

  datiVeicolo: any;

  @Output() onNextTab: EventEmitter<any> = new EventEmitter();

  @Input() pratica: any;

  @Input('options')

  get options(): Options {
  	return this.innerOptionsValue;
  }
  set options(v: Options) {
    console.log('VeicoloTab. Set options veicolo...');
  	if (v !== this.innerOptionsValue) {
  		this.innerOptionsValue = v;
      //this.tipologieVeicoloList = this.globals.parseArrayToSelectList(v.TipologieVeicolo);  
      this.tipologieVeicoloList = this.globals.parseArrayToSelectList(v.TipologieVeicolo) || []; 	
      
      //console.log(this.innerOptionsValue); 	  		
  	}
  }

  private innerOptionsValue: Options;

  tipologieVeicoloList: CompleteListItem[] = [];		// TipologieVeicolo from options 
  //tipologieVeicoloList: Array<CompleteListItem> = []; 

  constructor(public globals: Globals, private generalProvider: GeneralProvider) {
   // console.log('ctipologie');
   // console.log(this.options);
  }

  checkDatiVeicolo() {

    this.globals.showLoading().then(() => {
      this.generalProvider.callTargaService(this.pratica.P1_Targa, this.innerOptionsValue.TipoID).then((res: any) => {
        this.globals.hideLoading();

        //TODO
        console.log('VeicoloTab. callTargaService response: ', res);

        this.datiVeicolo = res;
        this.pratica.P1_DataImmatricolazione = this.datiVeicolo.DataImmatricolazione;
        this.pratica.P1_Marca = this.datiVeicolo.marca;
        this.pratica.P1_Modello = this.datiVeicolo.modello;
        this.pratica.P1_VeicoloCilindrata =  this.datiVeicolo.cilindrata != "n/d" ? this.datiVeicolo.cilindrata : null;
        this.pratica.P1_VeicoloAlimentazione = this.datiVeicolo.alimentazione;
        this.pratica.P1_VeicoloNumeroTelaio = this.datiVeicolo.telaio;
        this.pratica.P1_DataImmatricolazione = this.datiVeicolo.DataImmatricolazione;

        if(this.datiVeicolo.assicurato == 1)
        {
          this.pratica.P1_Assicurazione = this.datiVeicolo.CompagniaAssicurazione;
          this.pratica.P1_ScadenzaPolizza = this.datiVeicolo.DataScadenzaPolizza;
        } else {
          this.pratica.P1_Assicurazione = this.datiVeicolo.StatoAssicurazione;
        }

      })
      .catch(err => {
        console.log('VeicoloTab. callTargaService error: ', err);
        this.globals.hideLoading();
      });
    });

    console.log("VeicoloTab. callTargaService...");
  }

  ngOnInit() {
    console.log("VeicoloTab ViewDidLoad");
  }

}