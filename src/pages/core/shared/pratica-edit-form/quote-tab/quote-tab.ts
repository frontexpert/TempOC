import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { PdfPreviewPage } from '../../../shared/pdf-preview/pdf-preview';
import { QuotePrintModalPage } from '../../quote-print-modal/quote-print-modal';
import { InAppBrowserProvider} from '../../../../../providers/in-app-browser';
import { PracticesProvider} from '../../../../../providers/practices';
import { Globals } from '../../../../../shared/globals';
import { QuoteOptionsModalPage } from '../../quote-options-modal/quote-options-modal';
import { IfObservable } from 'rxjs/observable/IfObservable';

@Component({
  selector: 'quote-tab',
  templateUrl: 'quote-tab.html'
})
export class QuoteTabComponent {
  @Input() quotes: any[] = [];
  @Input() practicaID: number;

  quote: any;

  // pie
  colorScheme = {
    domain: ['#86c7f3', '#b0b0b0', '#ffe29a', '#9a9be5', '#95d974', '#ff8ba4']
  };
  showLabels = false;
  explodeSlices = false;
  doughnut = false;
  view: any[] = [180, 180];

  //Dettagli della pratica
  praticaDetails: any;
  marca: string = "";
  modello: string = "";
  versione: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private iab:InAppBrowserProvider, public pprovider: PracticesProvider, public globals: Globals) {
    
  }

  ngOnInit() {
   // alert('PRATICAID=' + this.practicaID);
    let praticheDetails = this.globals.praticaList.filter(it => {
      return (it.ID == this.practicaID);
    });

    this.praticaDetails = praticheDetails[0];

    if(this.praticaDetails != null)
    {
      console.log('PRATICA DETAILS:');
      console.log(this.praticaDetails);
      console.log(this.practicaID);
      //Prendo i dati marca, modello e versione della pratica attuale dagli id salvati
      this.globals.showLoading().then(() => {

        this.pprovider.getMarcaModelloVersione(this.practicaID).then((res: any) => {
          console.log("Update Pratica response: ", res);
          if(res != null){
            this.marca = res.Marca;
            this.modello = res.Modello;
            this.versione = res.Versione;
          }
          this.globals.hideLoading();
        })
        .catch(err => {
          this.globals.hideLoading();
          console.log("Errori update pratica: ", err);
          this.globals.showToastError('ERRORE 1: ' + err);
        });
      });
    }
    
  }

  

  ngOnChanges(changes: SimpleChanges) {

    if(this.quotes != undefined && this.quotes != null)
    {
      for (var i=0; i<this.quotes.length; i++){
     
        let statistiche = [
          {
            "name": "Ricambi",
            "value": Number(this.quotes[i].TotaleRicambi)
          },
          {
            "name": "Vcomplementari",
            "value": Number(this.quotes[i].TotaleVociComplementari)
          },
          {
            "name": "Smaltimento",
            "value": Number(this.quotes[i].TotaleSmaltimento)
          },
          {
            "name": "Matconsumo",
            "value": Number(this.quotes[i].TotaleMaterialeConsumo)
          },
          {
            "name": "Meccanica",
            "value": Number(this.quotes[i].TotaleMeccanica)
          },
          {
            "name": "Carrozzeria",
            "value": Number(this.quotes[i].TotaleCarrozzeria)
          }
        ];
  
        this.quotes[i].Single = statistiche;
        
      }
      console.log(this.quotes);
    }

  }

  onSelect(event) {
    console.log(event);
  }

  selezionaStampa(id: number): void {

    console.log('SELEZIONA STAMPA');

    var params = {
      title: "Scegli il tipo di stampa",
      id: id
    }

    let modal = this.modalCtrl.create(QuotePrintModalPage, params, {cssClass: "options-modal"});
    modal.present();
    modal.onDidDismiss((data) => {
      if (data != null && data.datiPreventivo != null) {

      //Faccio la chiamata al metodo, e passo al pdf il documento
      this.navCtrl.push(PdfPreviewPage, {datiPreventivo: data.datiPreventivo});
        
        

        //this.refreshDoc();
      }
    })
    
  }

  editQuoteOptions(nuovo: boolean): void {

    console.log('OPZIONI PREVENTIVO');

    //alert(this.globals.praticaList.length);

    let marcaId : number = null;
    let modelloId : number = null;
    let versioneId : number = null;
    let tipologiaVeicolo: number = null;

    if(this.praticaDetails != null)
    {
      
      console.log(this.praticaDetails);
      marcaId = this.praticaDetails.P1_VeicoloMarcaID;
      console.log('MARCA ID=' + marcaId);
      modelloId = this.praticaDetails.P1_VeicoloModelloID;
      versioneId = this.praticaDetails.P1_VeicoloVersioneID;
      tipologiaVeicolo = this.praticaDetails.P1_VeicoloTipoID;

      var params = {
        title: "Seleziona marca, modello e versione dalla tendina",
        marcaId: marcaId,
        modelloId: modelloId,
        versioneId: versioneId,
        tipologiaVeicolo: tipologiaVeicolo,
        nuovo: nuovo
      }
      
      let modal = this.modalCtrl.create(QuoteOptionsModalPage, params, {cssClass: "options-modal"});
        modal.present();
        modal.onDidDismiss((data) => {
          
          //Caso in cui si clicca fuori dalla finestra
          if(data == null)
          {
            return;
          }

          if(data.is_changed == false)
          {
            return;
          }

          let campi = data.Campi;

          //Aggiorno i campi ella pratica;
          this.praticaDetails.P1_VeicoloMarcaID = campi.marcaId;
          this.praticaDetails.P1_VeicoloModelloID = campi.modelloId;
          this.praticaDetails.P1_VeicoloVersioneID = campi.versioneId;

          this.globals.showLoading().then(() => {

            this.pprovider.updateMarcaModelloVersione(this.praticaDetails.ID, this.praticaDetails.P1_VeicoloMarcaID,  this.praticaDetails.P1_VeicoloModelloID, this.praticaDetails.P1_VeicoloVersioneID).then(res => {
              console.log(res);
              if(res.success){
                
                this.pprovider.getMarcaModelloVersione(this.practicaID).then((res: any) => {
                  console.log("Update Pratica response: ", res);
                  if(res != null){
                    this.marca = res.Marca;
                    this.modello = res.Modello;
                    this.versione = res.Versione;
                  }

                  if(campi.nuovo == true)
                  {
                    this.creaNuovo();
                  } else if (campi.nuovo == false)
                  {
                    this.globals.showToastSuccess('Dati pratica aggiornati con successo!');
                  }

                })
                .catch(err => {
                  this.globals.hideLoading();
                  console.log("Errori update pratica: ", err);
                  this.globals.showToastError('ERRORE 2: ' + err);
                });

              } else {
                this.globals.showToastError('ERRORE: ' + res.message);
              }
              this.globals.hideLoading();
              //this.events.publish("pratica-refresh", this.praticaDetails);
            })
            .catch(err => {
              this.globals.hideLoading();
              console.log("Errori update pratica: ", err);
              this.globals.showToastError('ERRORE 3: ' + err);
            });

          }); 

          
      })
    }
    
  }

  // ionViewWillLeave() {
  //   this.events.unsubscribe('quote-refresh');
  //   console.log('unsubscribe   Quote-refresh');
  // }


  editPreventivo(id: number): void {
    // this.events.subscribe('quote-refresh', () => { 
    //   this.pprovider.getQuoteList(this.practicaID).then((res: any) => {
    //     this.quotes = res;
    //   })
    // });
    this.iab.openPreventivo(id);
  }

  newPreventivo(): void {

    if((this.marca == '' || this.marca == '--' || this.marca == undefined) || (this.modello == '' || this.marca == '--' || this.modello == undefined) || (this.versione == '' || this.versione == '--' || this.versione == undefined))
    {
      this.editQuoteOptions(true);
      //this.globals.showToastError("Seleziona marca, modello e versione della pratica.");
      return;
    }

    this.creaNuovo();


  }

  creaNuovo() {

    this.globals.showLoading().then(() => {
      // get pratica edit details
      this.iab.newPreventivo(this.practicaID).then((res: any) => {
        console.log("Preventivo creato con successo");
        let preventivoId = res;
        // hide loading spinner
        
        if(preventivoId != null && preventivoId != 0)
        {
          this.pprovider.getQuote(preventivoId, this.practicaID).then((res: any) => {
            console.log("Dati preventivo");
            this.quote = res[0];
            // hide loading spinner
            
            if(this.quote != null)
            {
              this.quotes.unshift(this.quote);
            } else {
              this.globals.showToastError("IMPOSSIBILE RECUPERARE DATI PREVENTIVO.");
            }
    
          })
          .catch(err => {        
            console.log("ERRORE RECUPERO DATI PREVENTIVO: ",err);
            this.globals.showToastError("ERRORE RECUPERO DATI PREVENTIVO: " + err);
            // hide loading spinner
            this.globals.hideLoading();
          });
          this.globals.hideLoading();
          this.iab.openPreventivo(preventivoId);
        } else {
          this.globals.showToastError("Errore nella creaione del preventivo.");
        }

      })
      .catch(err => {        
        console.log("ERRORE CREAZIONE NUOVO PREVENTIVO: ",err);
        this.globals.showToastError("ERRORE CREAZIONE NUOVO PREVENTIVO: " + err);
        // hide loading spinner
        this.globals.hideLoading();
      });
    }); 

  }

}