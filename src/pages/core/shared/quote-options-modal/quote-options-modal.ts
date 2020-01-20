import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { IonicPage, NavController, Events, ViewController, NavParams } from 'ionic-angular';
import { GeneralProvider } from '../../../../providers/general';
import { Globals } from '../../../../shared/globals';
import { CompleteListItem, VeicoloOptions, Common } from '../../../../models/general';

@IonicPage()
@Component({
  selector: 'page-quote-options-modal',
  templateUrl: 'quote-options-modal.html',
})
export class QuoteOptionsModalPage {
 
  @ViewChild('#listaVeicolo') thisLista: any;

  title: string;
  didascalia: string = "Seleziona la MARCA";
  marcaId: number = 0;
  modelloId: number = 0;
  versioneId: number = 0;
  tipologiaVeicolo: number = 0;

  marcaTag: string = "";
  modelloTag: string = "";
  versioneTag: string = "";

  is_changed: boolean = false;

  campi: any = {
    marcaId: 0,
    modelloId: 0,
    versioneId: 0
  }

  errore: any = {
    marca: '',
    modello: '',
    versione: ''
  };

  searchTerm: string = '';
  
  activeItemID: number;         // active item ID

  actualSelection: string = "marca";
  actual_filter: Array<any> = [];
  actual_list: Array<any> = [];

  private innerOptionsValue: VeicoloOptions;

  constructor(public vc: ViewController, 
              public navParams: NavParams,
              private generalProvider: GeneralProvider,
              public globals: Globals) {
  }

  ngOnInit() {
    this.title = this.navParams.get('title');

    //Annullo in automatico marca, modello e versione
    this.marcaId = null; //this.navParams.get('marcaId');
    this.modelloId = null; //this.navParams.get('modelloId');
    this.versioneId = null; //this.navParams.get('versioneId');
    this.tipologiaVeicolo = this.navParams.get('tipologiaVeicolo');

    //if(this.marcaId != null && this.modelloId != null && this.versioneId != null) {

    //}
      
      //Marca, modello e versione già selezionati
      //this.didascalia = "";
      
    if(this.marcaId == null)
    {
      //Inizio con le marche
      this.generalProvider.getMarca().then(res => {
        let arr: any;
        arr = res;
        this.actual_list = this.globals.parseArrayToSelectList(arr) || []; // set pratice details
        this.actual_filter = this.actual_list;
      }).catch(err => {
        console.log(err);
        // hide loading spinner
        this.globals.hideLoading();
      });
    }
  }

  ionViewDidLoad() {
    console.log('QuoteOptionsModalPage ionViewDidLoad');

    // this.signaturePad is now available
    window.onresize = this.resizeCanvas.bind(this);
    this.resizeCanvas();
    //this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }

  private resizeCanvas(): void {
    
  }

  selectItem(item) {
    this.actual_list = [];
    this.actual_filter = [];
    this.globals.showLoading().then(() => {
      if(this.actualSelection == "marca")
      {
        //Devo selezionare il modello
        this.marcaId = item.value;
        this.marcaTag = item.text;
        this.generalProvider.getModello(this.marcaId, this.tipologiaVeicolo).then(res => {
          this.globals.hideLoading();
          let arr: any = [];
          arr = res;
          console.log('QuoteOptionsModalPage. getModello -> res');
          console.log(res);
          this.actual_list = this.globals.parseArrayToSelectList(arr) || [];
          this.actual_filter = this.actual_list;
          if(this.actual_list.length > 0)
          {
            this.didascalia = "Seleziona il MODELLO"; 
          } else {
            this.didascalia = "Nessun modello disponibile"; 
          }
          //this.didascalia = "Seleziona il MODELLO"; // set pratice details
          this.actualSelection = "modello";
          this.searchTerm = "";
        }).catch(err => {
          console.log('QuoteOptionsModalPage. getModello -> ERROR');
          console.log(err);
          // hide loading spinner
          this.globals.hideLoading();
        });
      } else if(this.actualSelection == "modello")
      {
        this.modelloId = item.value;
        this.modelloTag = item.text;
    
        this.generalProvider.getVersione(this.modelloId).then(res => {
          this.globals.hideLoading();
          let arr: any = [];
          arr = res;
          this.actual_list = this.globals.parseArrayToSelectList(arr) || []; // set pratice details
          this.actual_filter = this.actual_list;
          if(this.actual_list.length > 0)
          {
            this.didascalia = "Seleziona la VERSIONE";
          } else {
            this.didascalia = "Nessuna versione disponibile"; 
          }
          this.actualSelection = "versione";
          this.searchTerm = "";
        }).catch(err => {
          console.log('QuoteOptionsModalPage. getVersione -> res');
          console.log(err);
          // hide loading spinner
          this.globals.hideLoading();
        });
      } else if(this.actualSelection == "versione")
      {
        this.actual_list = [];;
        this.actual_filter = [];
        this.globals.hideLoading();
        this.versioneId = item.value;
        this.versioneTag = item.text;
        this.didascalia = "";
      }
    });
  }

  annulla(voce: string) {
    this.globals.showLoading().then(() => {
      switch (voce) {
        case 'marca':
          //annullo marca, modello e versione
          this.marcaId = null;
          this.modelloId = null;
          this.versioneId = null;
           //Inizio con le marche
          this.generalProvider.getMarca().then(res => {
            this.globals.hideLoading();
            let arr: any = [];
            arr = res;
            this.actual_list = this.globals.parseArrayToSelectList(arr) || []; // set pratice details
            this.actual_filter = this.actual_list;
            this.actualSelection = "marca"
          this.didascalia = "Seleziona la MARCA";
          this.marcaTag = "";
          this.modelloTag = "";
          this.versioneTag = "";
          this.searchTerm = "";
          }).catch(err => {
            console.log('QuoteOptionsModalPage. Annulla -> getMarca -> ERROR');
            console.log(err);
            // hide loading spinner
            this.globals.hideLoading();
          });
          break;
        case 'modello':
          //annullo modello e versione
          this.modelloId = null;
          this.versioneId = null;
          
          //Devo selezionare il modello
          this.generalProvider.getModello(this.marcaId, this.tipologiaVeicolo).then(res => {
            this.globals.hideLoading();
            let arr: any = [];
            arr = res;
            this.actual_list = this.globals.parseArrayToSelectList(arr) || [];
            this.actual_filter = this.actual_list;
            this.didascalia = "Seleziona il MODELLO"; // set pratice details
            this.actualSelection = "modello";
            this.modelloTag = "";
          this.versioneTag = "";
          this.searchTerm = "";
          }).catch(err => {
            console.log('QuoteOptionsModalPage. Annulla -> getModello -> ERROR');
            console.log(err);
            // hide loading spinner
            this.globals.hideLoading();
          });
          break;
        case 'versione':
          //annullo versione
          this.versioneId = null;
         
          this.generalProvider.getVersione(this.modelloId).then(res => {
            this.globals.hideLoading();
            let arr: any = [];
            arr = res;
            this.actual_list = this.globals.parseArrayToSelectList(arr) || []; // set pratice details
            this.actual_filter = this.actual_list;
            this.actualSelection = "versione";
            this.versioneTag = "";
            this.didascalia = "Seleziona la VERSIONE";
            this.searchTerm = "";
          }).catch(err => {
            console.log('QuoteOptionsModalPage. Annulla -> getVersione -> ERROR');
            console.log(err);
            // hide loading spinner
            this.globals.hideLoading();
          });
          break;
        default:
        this.globals.hideLoading();
          break;
      }
    });
  }

  dismiss() {
    //alert('d');
    this.campi = {
      marcaId: this.navParams.get('marcaId'),
      modelloId: this.navParams.get('modelloId'),
      versioneId: this.navParams.get('versioneId'),
      nuovo: this.navParams.get('nuovo')
    }
    
    this.is_changed = false;
    this.vc.dismiss({is_changed: this.is_changed, Campi : this.campi});
  }

  done() {

    if(this.marcaId == null || this.modelloId == null || this.versioneId == null)
    {
      this.globals.showToastError('Per favore seleziona marca, modello e versione');
      return;
    } else {
      this.campi = {
        marcaId: this.marcaId,
        modelloId: this.modelloId,
        versioneId: this.versioneId,
        nuovo: this.navParams.get('nuovo')
      }
  
      this.is_changed = true;
      this.vc.dismiss({is_changed: this.is_changed, Campi : this.campi});
    }
  }

  clearSelection() {
    /*this.marcaId = 0;
    this.changeSelection('marca');*/
  }

  changeSelection(voce: string) {
    
  }

  onChangeTime(input) {
    this.actual_list = this.actual_filter.filter(it => {
     // let P1_NomeCompleto = it.P1_Nome + " " + it.P1_Cognome;
    	return (it.text.toLowerCase().indexOf(input.value.toLowerCase()) > -1);
    });
  }

}
