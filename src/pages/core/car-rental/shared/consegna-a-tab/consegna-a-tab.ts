import { Component, Output, EventEmitter } from '@angular/core';
import { GeneralProvider } from '../../../../../providers/general';
import { Globals } from '../../../../../shared/globals';

@Component({
  selector: 'consegna-a-tab',
  templateUrl: 'consegna-a-tab.html'
})
export class ConsegnaATabComponent {
  @Output() onNextTab: EventEmitter<any> = new EventEmitter();
  @Output() onBackTab: EventEmitter<any> = new EventEmitter();

  // Properties
  countries: any[] = [];
  cities: any[] = [];

  constructor(private general: GeneralProvider,
              public globals: Globals) {
    this.initDropdownList();

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
  		.catch(err => console.log('ConsegnaATab. initDropdownList -> ERROR: ', err));
  }

  copiaDaUtilizzatore() {
    //Copia i dati da globals.noleggio.FatturazioneNome
    this.globals.noleggio.AnagraficaNome = this.globals.noleggio.FatturazioneNome;
    this.globals.noleggio.AnagraficaCognome = this.globals.noleggio.FatturazioneCognome;
    this.globals.noleggio.AnagraficaCodiceFiscale = this.globals.noleggio.FatturazionePartitaIva;
    this.globals.noleggio.AnagraficaTelefono = this.globals.noleggio.FatturazioneTelefono;
    this.globals.noleggio.AnagraficaEmail = this.globals.noleggio.FatturazioneEmail;
    this.globals.noleggio.AnagraficaCellulare = this.globals.noleggio.FatturazioneCellulare;
    this.globals.noleggio.AnagraficaResidenzaIndirizzo = this.globals.noleggio.FatturazioneIndirizzo;
    this.globals.noleggio.AnagraficaResidenzaCap = this.globals.noleggio.FatturazioneCap;
    this.globals.noleggio.AnagraficaResidenzaProvincia = this.globals.noleggio.FatturazioneProvincia;
    this.globals.noleggio.AnagraficaResidenzaComune = this.globals.noleggio.FatturazioneComune;
    this.globals.noleggio.AnagraficaResidenzaNazione = this.globals.noleggio.FatturazioneNazione;
    this.globals.noleggio.AnagraficaPatenteCategoria = this.globals.noleggio.FatturazioneDocumento;
    this.globals.noleggio.AnagraficaPatenteNumero = this.globals.noleggio.FatturazioneDocumentoNumero;
    this.globals.noleggio.AnagraficaPatenteScadenzaData = this.globals.noleggio.FatturazioneDocumentoScadenza;
    this.globals.noleggio.AnagraficaPatenteRilascioEnte = this.globals.noleggio.FatturazioneDocumentoRilascioEnte;
    this.globals.noleggio.AnagraficaPatenteRilascioData = this.globals.noleggio.FatturazioneDocumentoRilascioData;
  }

}