import { Component, Output, EventEmitter } from '@angular/core';
import { GeneralProvider } from '../../../../../providers/general';
import { Globals } from '../../../../../shared/globals';
import { Anagrafica } from '../../../../../models/general';
import { AlertController, Button } from 'ionic-angular';


@Component({
  selector: 'utilizzatore-tab',
  templateUrl: 'utilizzatore-tab.html'
})
export class UtilizzatoreTabComponent {
  @Output() onNextTab: EventEmitter<any> = new EventEmitter();

  // Properties
  countries: any[] = [];
  cities: any[] = [];

  //typeahead_formatter = (x: any) => x.AnagraficaCognome;

  constructor(private general: GeneralProvider,
              private alert: AlertController,
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
  		.catch(err => console.log('UtilizzatoreTab. getCountry -> ERROR: ', err));
  }

  searchAnagrafica(){
    console.log('searchAnagrafica');
    let cognome = this.globals.noleggio.FatturazioneCognome;
    if(cognome == null || cognome.length < 3){
      let alertBox = this.alert.create();
      alertBox.setTitle('attenzione');
      alertBox.setSubTitle('Inserire almeno i primi 3 caratteri del cognome');
      alertBox.addButton('OK');
      alertBox.present();
    }
    else {
      this.general.getAnagrafica(cognome).then((val: any) => {
        console.log(val.results);
        if (val.results.length > 0) {
          let alertRadio = this.alert.create();
          alertRadio.setTitle('scegli cliente');
          for (let anag of val.results) {
            alertRadio.addInput({
              type: 'radio',
              label: anag.AnagraficaNomeCompleto,
              value: anag
            })
          }
          alertRadio.addButton('Cancel');
          alertRadio.addButton({
            text: 'OK',
            handler: (data: Anagrafica) => {

              this.globals.noleggio.FatturazioneNome = data.AnagraficaNome;
              this.globals.noleggio.FatturazioneCognome = data.AnagraficaCognome;
              this.globals.noleggio.FatturazioneIndirizzo = data.AnagraficaResidenzaIndirizzo;
              this.globals.noleggio.FatturazioneComune = data.AnagraficaResidenzaComune;
              this.globals.noleggio.FatturazioneNazione = data.AnagraficaResidenzaNazione;
              this.globals.noleggio.FatturazioneProvincia = data.AnagraficaResidenzaProvincia;
              this.globals.noleggio.FatturazioneEmail = data.AnagraficaEmail;
              this.globals.noleggio.FatturazioneCellulare = data.AnagraficaCellulare;
              this.globals.noleggio.FatturazioneCap = data.AnagraficaResidenzaCap;
              this.globals.noleggio.FatturazionePartitaIva = data.AnagraficaCodiceFiscale;
              this.globals.noleggio.FatturazioneTelefono = data.AnagraficaTelefono;
              this.globals.noleggio.FatturazioneDocumento = data.AnagraficaPatenteCategoria;
              this.globals.noleggio.FatturazioneDocumentoScadenza = null;
              this.globals.noleggio.FatturazioneDocumentoRilascioData = data.AnagraficaPatenteRilascioData;
              this.globals.noleggio.FatturazioneDocumentoRilascioEnte = data.AnagraficaPatenteRilascioEnte;
              this.globals.noleggio.FatturazioneDocumentoNumero = data.AnagraficaPatenteNumero;


            }
          })
          alertRadio.present();
        }else{
          let alertBox = this.alert.create();
          alertBox.setTitle('attenzione');
          alertBox.setSubTitle('Nessun risultato trovato');
          alertBox.addButton('OK');
          alertBox.present();       
        }

      })
        .catch(err => console.log('UtilizzatoreTab. getAnagrafica -> ERROR: ', err));

    }
  }


}