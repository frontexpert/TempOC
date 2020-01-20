import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { GeneralProvider } from '../../../../providers/general';
import { PracticesProvider } from '../../../../providers/practices';
import { Globals } from '../../../../shared/globals';
import * as Constants from '../../../../shared/constants';

import { Options } from '../../../../models/general';


@IonicPage()
@Component({
  selector: 'page-practice-edit',
  templateUrl: 'practice-edit.html',
})
export class PracticeEditPage {

  pID: number;      // id of pratica

  tabValues = Constants.APERTE_TAB_VALUES;

  selectedTab: number = 0;
  checkedTabs = [];

  siglaPratica: string = '';

  public pratica: any = {};  // pratica body data

  public options: Options = new Options();  // Pratica Options

  constructor(public navCtrl: NavController, 
              private navParams: NavParams, 
              public globals: Globals, 
              private practicaProvider: PracticesProvider, 
              private generalProvider: GeneralProvider) {

    // check the first tab when created this modal
    this.checkedTabs.push(this.selectedTab);

    this.pID = this.navParams.get('ID');
    this.globals.praticaTipoID = this.navParams.get('TipoID');

    switch (this.globals.praticaTipoID) {
      case Constants.CREATION_CASE.RIPARAZIONE_MANUTENZIONE_CHECKUP:
        this.tabValues = Constants.APERTE_FIRST_VALUES;
        this.siglaPratica = "RIPARAZIONE";
        break;
      case Constants.CREATION_CASE.RIMBORSO_ASSICURATIVO_RCA:
        this.tabValues = Constants.APERTE_TAB_VALUES;
        this.siglaPratica = "RCA CARD";
        break;
      case Constants.CREATION_CASE.RADD_KASCO:
        this.tabValues = Constants.APERTE_SECOND_VALUES;
        this.siglaPratica = "KASCO";
        break;
        case Constants.CREATION_CASE.RADD_ATTI_VANDALICI:
        this.tabValues = Constants.APERTE_SECOND_VALUES;
        this.siglaPratica = "ATTI VANDALICI";
        break;
        case Constants.CREATION_CASE.RADD_EVENTI_NATURALI_GRANDINE:
        this.tabValues = Constants.APERTE_SECOND_VALUES;
        this.siglaPratica = "EVENTI NATURALI";
        break;
        case Constants.CREATION_CASE.RADD_FURTO_PARZIALE:
        this.tabValues = Constants.APERTE_SECOND_VALUES;
        this.siglaPratica = "FURTO PARZIALE";
        break;
        case Constants.CREATION_CASE.RADD_CRISTALLI:
        this.tabValues = Constants.APERTE_SECOND_VALUES;
        this.siglaPratica = "CRISTALLI";
        break;
        case Constants.CREATION_CASE.RADD_RESPONSABILITA_DIRETTA:
        this.tabValues = Constants.APERTE_SECOND_VALUES;
        this.siglaPratica = "RD";
        break;
        case Constants.CREATION_CASE.RADD_ALTRI_DANNI:
        this.tabValues = Constants.APERTE_SECOND_VALUES;
        this.siglaPratica = "ALTRI DANNI";
        break;
        case Constants.CREATION_CASE.NOLEGGIO:
        this.tabValues = Constants.PRATICA_NOLEGGIO_VALUES;
        this.siglaPratica = "NOLEGGIO";
        break;
      default:
        this.tabValues = Constants.APERTE_SECOND_VALUES;
        break;
    }

    this.initOptions();

  }

  ngOnInit() {
    console.log('ngOnInit');
    // show loading spinner
    this.globals.showLoading().then(() => {
      // get pratica edit details
      this.practicaProvider.getEditDetails(this.pID).then((res: any) => {
        console.log("Success in get pratica edit");
        this.pratica = res;
        // hide loading spinner
        this.globals.hideLoading();
      })
      .catch(err => {        
        console.log("GET PRATICA EDIT ERROR: ",err);
        // hide loading spinner
        this.globals.hideLoading();
      });
    });
  }

  handleNextSelection(): void {    
    console.log("this.selectedTab");
    console.log(this.selectedTab);
    if(this.checkedTabs.indexOf(this.selectedTab) === -1){
      this.checkedTabs.push(this.selectedTab);
    }

    if (this.selectedTab < this.tabValues.length - 1) {
      this.selectedTab++;
    }    
    else {
      
      //faccio i controlli del caso
      if(!this.checkPratica())
      {
        this.globals.showToastError('Per favore compila tutti i campi richiesti.');
        return;
      }

      alert(this.pratica.P1_Sesso);
      
      // save to insert pratica
      this.globals.showLoading().then(() => {
        this.practicaProvider.update(this.pratica).then(res => {
          this.globals.hideLoading();
          console.log("Update Pratica response: ", res);
          if(res == null || res.success){
            this.globals.showToastSuccess('Pratica aggiornata con successo!');
            this.navCtrl.pop();
          } else {
            this.globals.showToastError('Errore aggiornamento pratica: ' + res.message);
          }
        })
        .catch(err => {
          this.globals.hideLoading();
          console.log("Update Pratica errors: ", err);
          this.globals.showToastError('ERRORE: ' + err);
        });
      });      
    }
    console.log('SELEZIONATA');
    console.log(this.selectedTab);
    console.log("Pratica values is:", this.pratica);
  }

  /**
   * On clicked back button event to select previous tab
   */
  public handleBackSelection(): void {    
    if (this.selectedTab > 0) {
      this.selectedTab = this.selectedTab - 1;
    }    
    console.log("Active tab", this.selectedTab);    
  }

  /**
   * GetOptions via API call
   */
  private initOptions(): void {
    this.generalProvider.getOptions(this.globals.praticaTipoID)
      .then((opt: Options) => {
        this.options = opt;
      })
      .catch(err => console.log('ERROR: ', err));
  }

  checkPratica() {
    
    let valida: boolean = true;
    let veicolo: boolean = false;
    let cliente: boolean = false;
    let controparte: boolean = false;
    let sinistro: boolean = false;

    switch (this.globals.praticaTipoID) {
      case Constants.CREATION_CASE.RIPARAZIONE_MANUTENZIONE_CHECKUP, Constants.CREATION_CASE.NOLEGGIO:
        //veicolo, cliente
        veicolo = true;
        cliente = true;
        break;
      case Constants.CREATION_CASE.RIMBORSO_ASSICURATIVO_RCA:
        //veicolo, cliente, sinistro, controparte
        veicolo = true;
        cliente = true;
        sinistro = true;
        controparte = true;
        break;
      case Constants.CREATION_CASE.RADD_KASCO, Constants.CREATION_CASE.RADD_ATTI_VANDALICI, Constants.CREATION_CASE.RADD_EVENTI_NATURALI_GRANDINE,
      Constants.CREATION_CASE.RADD_FURTO_PARZIALE, Constants.CREATION_CASE.RADD_CRISTALLI, Constants.CREATION_CASE.RADD_RESPONSABILITA_DIRETTA, Constants.CREATION_CASE.RADD_ALTRI_DANNI:
        //veicolo, cliente, sinistro
        veicolo = true;
        cliente = true;
        sinistro = true;
        break;
    }

    if(veicolo == true)
    {
      //check tab veicolo
      if(this.pratica.P1_Targa == '' || this.pratica.P1_Targa == null)
      {
        valida = false;
      }
      if(this.pratica.P1_DataImmatricolazione == '' || this.pratica.P1_DataImmatricolazione == null)
      {
        valida = false;
      }
      if(this.pratica.P1_Assicurazione == '' || this.pratica.P1_Assicurazione == null)
      {
        valida = false;
      }
      if(this.pratica.P1_Marca == '' || this.pratica.P1_Marca == null)
      {
        valida = false;
      }
      if(this.pratica.P1_Modello == '' || this.pratica.P1_Modello == null)
      {
        valida = false;
      }

    }
    if(cliente == true)
    {
      //check tab cliente
      if(this.pratica.P1_Cognome == '' || this.pratica.P1_Cognome == null || this.pratica.P1_Nome == '' || this.pratica.P1_Nome == null)
      {
        if(this.pratica.P1_RagioneSociale == '' || this.pratica.P1_RagioneSociale == null)
        {
          valida = false;
        }
      }

      if(this.pratica.P1_LuogoNascitaNazione == '' || this.pratica.P1_LuogoNascitaNazione == null)
      {
          valida = false;
      }
    }
    if(sinistro == true)
    {
      //check tab sinistro
      if(this.pratica.SinistroData == '' || this.pratica.SinistroData == null)
      {
        valida = false;
      }
      if(this.pratica.SinistroP1CircostanzaID == '' || this.pratica.SinistroP1CircostanzaID == null)
      {
        valida = false;
      }
      if(this.pratica.SinistroP2CircostanzaID == '' || this.pratica.SinistroP2CircostanzaID == null)
      {
        valida = false;
      }
      if(this.pratica.SinistroIndirizzo == '' || this.pratica.SinistroIndirizzo == null)
      {
        valida = false;
      }
      if(this.pratica.SinistroComune == '' || this.pratica.SinistroComune == null)
      {
        valida = false;
      }
    }

    if(controparte == true)
    {
      if(this.pratica.P2_Targa == '' || this.pratica.P2_Targa == null)
      {
        valida = false;
      }
      if(this.pratica.P2_Assicurazione == '' || this.pratica.P2_Assicurazione == null)
      {
        valida = false;
      }
      if(this.pratica.P2_Marca == '' || this.pratica.P2_Marca == null)
      {
        valida = false;
      }
      if(this.pratica.P2_Modello == '' || this.pratica.P2_Modello == null)
      {
        valida = false;
      }
      if(this.pratica.P2_Cognome == '' || this.pratica.P2_Cognome == null)
      {
        if(this.pratica.P2_RagioneSociale == '' || this.pratica.P2_RagioneSociale == null)
        {
          valida = false;
        }
      }
      if(this.pratica.P2_Nome == '' || this.pratica.P2_Nome == null)
      {
        if(this.pratica.P2_RagioneSociale == '' || this.pratica.P2_RagioneSociale == null)
        {
          valida = false;
        }
      }
    }

    return valida;

  }

}
