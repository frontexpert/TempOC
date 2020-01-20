import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { GeneralProvider } from '../../../../providers/general';
import { PracticesProvider } from '../../../../providers/practices';
import { Globals } from '../../../../shared/globals';
import * as Constants from '../../../../shared/constants';

import { Options } from '../../../../models/general';
import { ApertePage } from '../../aperte/aperte';

@IonicPage()
@Component({
  selector: 'page-insert-practice',
  templateUrl: 'insert-practice.html',
})
export class InsertPracticePage {

  tabValues = Constants.APERTE_TAB_VALUES;

  selectedTab: number = 0;
  checkedTabs = [];

  isFirstCase: boolean;    // TipoID value for Pratica Insert: 100

  isSecondCase: boolean;   // RIMBORSO ASSICURATIVO DANNI DIVERSI

  isAllTabsAvailable: boolean;

  siglaPratica: string = '';

  public pratica: any = {};  // pratica body data

  public options: Options = new Options();  // Pratica Options
  //public options: Options = new Options();  // Pratica Options

  constructor(public navCtrl: NavController, public globals: Globals, private navParams: NavParams, private practicaProvider: PracticesProvider, private generalProvider: GeneralProvider) {
    // check the first tab when created this modal

    this.initOptions();

    if(this.pratica.P1_LuogoNascitaNazione == '' || this.pratica.P1_LuogoNascitaNazione == null)
    {
      this.pratica.P1_LuogoNascitaNazione = "ITALIA";
    }

    if(this.pratica.SinistroP1CircostanzaID == '' || this.pratica.SinistroP1CircostanzaID == null)
    {
      this.pratica.SinistroP1CircostanzaID = 1;
    }

    if(this.pratica.SinistroP2CircostanzaID == '' || this.pratica.SinistroP2CircostanzaID == null)
    {
      this.pratica.SinistroP2CircostanzaID = 1;
    }

    if(this.pratica.P2_VeicoloTipoID == '' || this.pratica.P2_VeicoloTipoID == null)
    {
      this.pratica.P2_VeicoloTipoID = 1;
    }

    if(this.pratica.P1_ResidenzaNazione == '' || this.pratica.P1_ResidenzaNazione == null)
    {
      this.pratica.P1_ResidenzaNazione = "ITALIA";
    }

    this.checkedTabs.push(this.selectedTab);

    switch (this.globals.praticaTipoID) {
      case Constants.CREATION_CASE.RIPARAZIONE_MANUTENZIONE_CHECKUP:
        this.tabValues = Constants.APERTE_FIRST_VALUES;
        this.isFirstCase = true;
        this.siglaPratica = "RIPARAZIONE";
        break;
      case Constants.CREATION_CASE.RIMBORSO_ASSICURATIVO_RCA:
        this.tabValues = Constants.APERTE_TAB_VALUES
        this.isAllTabsAvailable = true;
        this.siglaPratica = "RCA CARD";
        break;
      case Constants.CREATION_CASE.RADD_KASCO:
        this.tabValues = Constants.APERTE_SECOND_VALUES;
        this.isSecondCase = true; 
        this.siglaPratica = "KASCO";
        break;
        case Constants.CREATION_CASE.RADD_ATTI_VANDALICI:
        this.tabValues = Constants.APERTE_SECOND_VALUES;
        this.isSecondCase = true; 
        this.siglaPratica = "ATTI VANDALICI";
        break;
        case Constants.CREATION_CASE.RADD_EVENTI_NATURALI_GRANDINE:
        this.tabValues = Constants.APERTE_SECOND_VALUES;
        this.isSecondCase = true; 
        this.siglaPratica = "EVENTI NATURALI";
        break;
        case Constants.CREATION_CASE.RADD_FURTO_PARZIALE:
        this.tabValues = Constants.APERTE_SECOND_VALUES;
        this.isSecondCase = true;
        this.siglaPratica = "FURTO PARZIALE";
        break;
        case Constants.CREATION_CASE.RADD_CRISTALLI:
        this.tabValues = Constants.APERTE_SECOND_VALUES;
        this.isSecondCase = true;
        this.siglaPratica = "CRISTALLI";
        break;
        case Constants.CREATION_CASE.RADD_RESPONSABILITA_DIRETTA:
        this.tabValues = Constants.APERTE_SECOND_VALUES;
        this.isSecondCase = true; 
        this.siglaPratica = "RD";
        break;
        case Constants.CREATION_CASE.RADD_ALTRI_DANNI:
        this.tabValues = Constants.APERTE_SECOND_VALUES;
        this.isSecondCase = true; 
        this.siglaPratica = "ALTRI DANNI";
        break;
        case Constants.CREATION_CASE.NOLEGGIO:
        this.tabValues = Constants.PRATICA_NOLEGGIO_VALUES;
        this.siglaPratica = "NOLEGGIO";
        break;
      default:
        this.tabValues = Constants.APERTE_SECOND_VALUES;
        this.isSecondCase = true;
        break;
    }
    
  }
  ngOnInit() {
    
    this.pratica.P1_Targa = this.navParams.get('Targa');

    //Inizializza i parametri
    if(this.pratica.P1_LuogoNascitaNazione == undefined)
    {
      this.pratica.P1_LuogoNascitaNazione = null;
    }
    if(this.pratica.P1_LuogoNascita == undefined)
    {
      this.pratica.P1_LuogoNascita = null;
    }
    if(this.pratica.P1_ResidenzaNazione == undefined)
    {
      this.pratica.P1_ResidenzaNazione = null;
    }
    if(this.pratica.P1_ResidenzaComune == undefined)
    {
      this.pratica.P1_ResidenzaComune = null;
    }
    if(this.pratica.SinistroComune == undefined)
    {
      this.pratica.SinistroComune = null;
    }
    if(this.pratica.P1_VeicoloTipoID == undefined)
    {
      this.pratica.P1_VeicoloTipoID = 1;
    }

    if(this.globals.praticaTipoID == Constants.CREATION_CASE.NOLEGGIO && this.navParams.get('NoleggioID')){

      this.pratica.NoleggioID = this.navParams.get('NoleggioID');
      //Veniamo da un noleggio da cui abbiamo creato la pratica
      this.globals.showLoading().then(() => {
        // get pratica edit details
        this.practicaProvider.createFromNoleggio(this.pratica.P1_Targa, this.pratica.NoleggioID).then((res: any) => {
          console.log("Success in create pratica from noleggio");
          this.pratica = res;
          // hide loading spinner
          this.globals.hideLoading();
        })
        .catch(err => {        
          console.log("CREATE FROM NOLEGGIO ERROR: ",err);
          // hide loading spinner
          this.globals.hideLoading();
        });
      });

    } else {

      if(this.navParams.get('usePrevious')){
        this.globals.showLoading().then(() => {
          // get pratica edit details
          this.practicaProvider.getInsertDetailsFromTarga(this.pratica.P1_Targa).then((res: any) => {
            console.log("Success in get pratica insert from targa");
            this.pratica = res;
            // hide loading spinner
            this.globals.hideLoading();
          })
          .catch(err => {        
            console.log("GET PRATICA INSERT DATA FROM TARGA ERROR: ",err);
            // hide loading spinner
            this.globals.hideLoading();
          });
        });
      }

    }

  }


  handleNextSelection(): void {    
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

      // save to insert pratica
      this.pratica.TipoID = this.globals.praticaTipoID; // set TipoID
      
      this.globals.showLoading().then(() => {
        this.practicaProvider.post(this.pratica).then(res => {
          this.globals.hideLoading();
          console.log("Insert Pratica response: ", res);
          this.globals.showToastSuccess('Pratica salvata con successo!');
          this.navCtrl.push(ApertePage);
          // load list 
          this.practicaProvider.getAllPratices().then((res: any) => {
            console.log("Success in getting all practices list");
            this.globals.praticaList = res;      
          })
          .catch(err => {
            console.log("failed in getting all practices list");
            console.log(err);
          });
          
        })
        .catch(err => {
          this.globals.hideLoading();
          console.log("Insert Pratica errors: ", err);
          this.globals.showToastError('ERRORE: ' + err);
        });
      });      
    }
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
      if(this.pratica.P2_Cognome == '' || this.pratica.P2_Cognome == null || this.pratica.P2_Nome == '' || this.pratica.P2_Nome == null)
      {
        if(this.pratica.P2_RagioneSociale == '' || this.pratica.P2_RagioneSociale == null)
        {
          valida = false;
        }
      }
    }

    return valida;

  }

  tornaAPratiche() {
    this.navCtrl.push(ApertePage);
  }

}
