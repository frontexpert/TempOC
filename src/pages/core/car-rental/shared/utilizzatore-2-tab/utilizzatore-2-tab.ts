import { Component, Output, EventEmitter } from '@angular/core';
import { GeneralProvider } from '../../../../../providers/general';
import { Globals } from '../../../../../shared/globals';

@Component({
  selector: 'utilizzatore-2-tab',
  templateUrl: 'utilizzatore-2-tab.html'
})
export class Utilizzatore2TabComponent {
  @Output() onNextTab: EventEmitter<any> = new EventEmitter();
  @Output() onBackTab: EventEmitter<any> = new EventEmitter();

  // Properties
  countries: any[] = [];
  cities: any[] = [];
  utilizzatore2 = false;

  constructor(private general: GeneralProvider,
              public globals: Globals) {
    this.initDropdownList();

    if(this.globals.noleggio.Anagrafica2Nome != null && this.globals.noleggio.Anagrafica2Nome != '')
    {
      this.utilizzatore2 = true;
    }
  }

  checkChange() {
    if(this.utilizzatore2 == false) {
      //Svuota tutit i campi
      this.globals.noleggio.Anagrafica2Nome = '';this.globals.noleggio.FatturazioneNome;
      this.globals.noleggio.Anagrafica2Cognome = '';
      this.globals.noleggio.Anagrafica2CodiceFiscale = '';
      this.globals.noleggio.Anagrafica2Telefono = '';
      this.globals.noleggio.Anagrafica2Email = '';
      this.globals.noleggio.Anagrafica2Cellulare = '';
      this.globals.noleggio.Anagrafica2ResidenzaIndirizzo = '';
      this.globals.noleggio.Anagrafica2ResidenzaCap = '';
      this.globals.noleggio.Anagrafica2ResidenzaProvincia = '';
      this.globals.noleggio.Anagrafica2ResidenzaComune = '';
      this.globals.noleggio.Anagrafica2ResidenzaNazione = '';
      this.globals.noleggio.Anagrafica2PatenteCategoria = '';
      this.globals.noleggio.Anagrafica2PatenteNumero = '';
      this.globals.noleggio.Anagrafica2PatenteScadenzaData = null;
      this.globals.noleggio.Anagrafica2PatenteRilascioEnte = '';
      this.globals.noleggio.Anagrafica2PatenteRilascioData = null;
    }
  }

  /**
   * Initialize Dropdown list
   */
  initDropdownList(): void {
  	Promise.all([this.general.getCountry(), this.general.getComune()])
  		.then((values: any[]) => {
  			this.countries = values[0];
  			this.cities = values[1];
  		})
  		.catch(err => console.log('Utilizzatore2Tab. getCountry -> ERROR: ', err));
  }
}