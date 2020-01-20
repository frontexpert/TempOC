import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { IonicPage, NavController, Events, ViewController, NavParams, AlertController } from 'ionic-angular';
//import { GeneralProvider } from '../../../../providers/general';
import { PracticesProvider } from '../../../../providers/practices';
import { Globals } from '../../../../shared/globals';
import { CompleteListItem, VeicoloOptions, Common } from '../../../../models/general';

@IonicPage()
@Component({
  selector: 'page-gestione-autonoma-modal',
  templateUrl: 'gestione-autonoma-modal.html',
})
export class GestioneAutonomaModalPage {
 
  dettagliAutonoma: Array<any> = [];

  title: string;
  praticaId: number;

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

  constructor(public vc: ViewController, 
              public navParams: NavParams,
              private practicesProvider: PracticesProvider,
              private alert: AlertController,
              public globals: Globals) {
  }

  ngOnInit() {
    this.title = this.navParams.get('title');
    this.praticaId = this.navParams.get('practicaID');

    
    this.globals.showLoading().then(() => {
      // get pratica edit details
      this.practicesProvider.getDetailsAutogestita(this.praticaId).then((res: any) => {
        console.log("Success in getDetailsAutogestita");
        this.dettagliAutonoma = res;
        console.log('DETTAGLIAUTONOMA');
        console.log(this.dettagliAutonoma);
        // hide loading spinner
        this.globals.hideLoading();
      })
      .catch(err => {        
        console.log("getDetailsAutogestita error: ",err);
        // hide loading spinner
        this.globals.hideLoading();
      });
    });
  }

  ionViewDidLoad() {
    console.log('GestioneAutonomaModalPage ionViewDidLoad');

    // this.signaturePad is now available
    window.onresize = this.resizeCanvas.bind(this);
   
  }

  private resizeCanvas(): void {
    
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

  update() {

    this.campi = {
      praticaId: this.praticaId
    }

    this.globals.showLoading().then(() => {

      this.practicesProvider.updateDatiAutogestione(this.praticaId, this.dettagliAutonoma).then(res => {
        this.globals.hideLoading();
        let arr: any = [];
        arr = res;
        console.log('GestioneAutonomaModalPage. updateDatiAutogestione -> res');
        console.log(res);

        if(res.message == "OK")
        {
          this.globals.showToastSuccess('Dati aggiornati con successo');

          this.is_changed = true;
          this.vc.dismiss({is_changed: this.is_changed, Campi : this.campi});
        } else {
          this.globals.showToastError('ERRORE: ' + res.message);
          this.is_changed = false;
          this.vc.dismiss({is_changed: this.is_changed, Campi : this.campi});
        }
      }).catch(err => {
        console.log('GestioneAutonomaModalPage. updateDatiAutogestione -> ERROR');
        console.log(err);
        // hide loading spinner
        this.globals.hideLoading();

        let messaggioErrore = "";
        if(err.hasOwnProperty('message'))
        {
          messaggioErrore = err.message;
          this.globals.showToastError("ERRORE AGGIORNAMENTO DATI: " + messaggioErrore);
        } else {
          this.globals.showToastError("ERRORE AGGIORNAMENTO DATI");
        }

      });

    });

    this.is_changed = true;
    this.vc.dismiss({is_changed: this.is_changed, Campi : this.campi});

  }

  annulla() {

    this.globals.showLoading().then(() => {
      // get pratica edit details
      this.practicesProvider.getDetailsAutogestita(this.praticaId).then((res: any) => {
        console.log("Success in getDetailsAutogestita");
        this.dettagliAutonoma = res;
        console.log('DETTAGLIAUTONOMA');
        console.log(this.dettagliAutonoma);
        // hide loading spinner
        this.globals.hideLoading();
      })
      .catch(err => {        
        console.log("getDetailsAutogestita error: ",err);
        // hide loading spinner
        this.globals.hideLoading();
      });
    });

  }

}