import { Component, ViewChild, Input, Output, EventEmitter, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { IonicPage, NavController, Events, ViewController, NavParams, AlertController } from 'ionic-angular';
import { PracticesProvider } from '../../../../providers/practices';
import { Globals } from '../../../../shared/globals';
import { CompleteListItem, VeicoloOptions, Common } from '../../../../models/general';

@IonicPage()
@Component({
  selector: 'page-assegna-garante-modal',
  templateUrl: 'assegna-garante-modal.html',
})
export class AssegnaGaranteModalPage {
 
  @ViewChild('#listaVeicolo') thisLista: any;

  title: string;
  praticaId: number;

  is_changed: boolean = false;

  lista_garanti: Array<any> = [];
  conta_garanti: number = null;

  garante_selezionato: string = "";
  garanteID: number = null;

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

    //Inizio con le marche
    this.practicesProvider.getListaGaranti().then(res => {
      let arr: any;
      arr = res;
      console.log('risposta...');
      console.log(res);
      this.lista_garanti = arr || [];

      if(this.lista_garanti.length > 0)
      {
       // console.log('lista garanti=' + this.lista_garanti)[0].Garante.Nome;
        this.garante_selezionato = this.lista_garanti[0].Garante.Nome;
        this.garanteID = this.lista_garanti[0].GaranteID;
        //alert(this.garante_selezionato);
        this.conta_garanti = 0;
      } else {
        this.garante_selezionato = "Nessun garante disponibile";
      }
    }).catch(err => {
      console.log(err);
      
      // hide loading spinner
      this.globals.hideLoading();
    });
  }

  ionViewDidLoad() {
    console.log('AssegnaGaranteModalPage ionViewDidLoad');

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

  assign() {

    this.campi = {
      cambio: false,
      garanteID: null,
      garanteNome: ""
    }

    //ID: praticaID,
      //DataInvioPec: DataInvioPec, 
      //DataTermineLiquidazione: DataTermineLiquidazione, 
      //DataLiquidazioneParziale: DataLiquidazioneParziale, 
      //DataLiquidazioneCompletata: DataLiquidazioneCompletata

    let confirm = this.alert.create({
      title: 'Confermi?',
      message: 'Vuoi assegnare la pratica al garante',
      buttons: [
        {
          text: "Cancella",
          handler: () => {
            console.log('Annullamento assegnazione pratica al garante');
          }
        },
        {
          text: 'OK',
          handler: () => {
            this.globals.showLoading().then(() => {

              this.practicesProvider.assegnaGarante(this.praticaId, this.garanteID).then(res => {
                this.globals.hideLoading();
                let arr: any = [];
                arr = res;
                console.log('AssegnaGaranteModalPage. assegnaGarante -> res');
                console.log(res);

                if(res.message == "OK")
                {
                  this.globals.showToastSuccess('Garante assegnato con successo');
                  this.campi.cambio = true;
                  this.campi.garanteID = this.garanteID;
                  this.campi.garanteNome = this.garante_selezionato;

                  this.is_changed = true;
                  this.vc.dismiss({is_changed: this.is_changed, Campi : this.campi});
                } else {
                  this.globals.showToastError('ERRORE: ' + res.message);
                  this.is_changed = false;
                  this.vc.dismiss({is_changed: this.is_changed, Campi : this.campi});
                }
              }).catch(err => {
                console.log('AssegnaGaranteModalPage. assegnaGarante -> ERROR');
                console.log(err);

                let messaggioErrore = "";
                if(err.hasOwnProperty('message'))
                {
                  messaggioErrore = err.message;
                  this.globals.showToastError("ERRORE ASSEGNAZIONE GARANTE: " + messaggioErrore);
                } else {
                  this.globals.showToastError("ERRORE ASSEGNAZIONE GARANTE");
                }
                
                // hide loading spinner
                this.globals.hideLoading();
              });

            });

          }
        }
      ]
    });
    confirm.present();

  }

  change() {
    if(this.lista_garanti.length > 0)
      {

        if(this.conta_garanti < (this.lista_garanti.length - 1))
        {
          this.conta_garanti = this.conta_garanti + 1;

        } else {
          this.conta_garanti = 0;
        }

        this.garante_selezionato = this.lista_garanti[this.conta_garanti].Garante.Nome;
        this.garanteID = this.lista_garanti[this.conta_garanti].GaranteID;
      } else {
        this.garante_selezionato = "Nessun garante disponibile";
        this.garanteID = null;
      }
  }

}