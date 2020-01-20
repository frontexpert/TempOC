import { Component } from '@angular/core';
import { NavController, NavParams, Events, ModalController } from 'ionic-angular';
import * as Constants from '../../../../shared/constants';
import { Globals } from '../../../../shared/globals';
import { CarRentalProvider } from '../../../../providers/car-rental';
import { DocumentsProvider } from '../../../../providers/documents';
import { CarRentalPage } from '../car-rental';
import { PdfPreviewPage } from '../../shared/pdf-preview/pdf-preview';
import { RentDocumentItem } from '../../../../models/rentDocument';
import { PraticheModalPage } from '../../shared/pratiche-modal/pratiche-modal';
import { PracticeEditPage } from '../../practice/practice-edit/practice-edit';
import { InsertPracticePage } from '../../practice/insert-practice/insert-practice';

@Component({
  selector: 'page-noleggio-document',
  templateUrl: 'noleggio-document.html',
})
export class NoleggioDocumentPage {

    document: RentDocumentItem;
    //NoleggioID : number;

    praticaID: any = null;
    relPratica: any = null;
    firmePresenti: boolean = false;
    
    constructor(public navCtrl: NavController, 
                public navParams: NavParams,
                public events: Events,
                public globals: Globals,
                public modalCtrl: ModalController,
                private _carRental: CarRentalProvider,
                private documentsProvider : DocumentsProvider
                
                ) {
                  
                  this.document = new RentDocumentItem();
                  //this.NoleggioID = this.navParams.get("NoleggioID");
    }

    ionViewWillEnter() {
      
      console.log('subscribe   ApertePage');
      this.events.subscribe('documentDetails-ricarica', (firmato: boolean) => {
        this.globals.showLoading().then(() => {
          this.documentsProvider.checkRentDocuments(this.globals.noleggio.ID, this.document.TipoId).then((res : any) => {

            this.document.Thumb = res[0].Thumb;
            this.document.Url = res[0].Url;
            this.document.ID = res[0].ID;
            
            //let tipoID = this.document.TipoId;
            
            //this.document = res[0];
            //this.document.TipoId = tipoID;
            if(firmato == true)
            {
              this.firmePresenti = true;
            } else {
              this.firmePresenti = false;
            }
            
            this.globals.hideLoading();
          })
          .catch(err => {
            console.log('Get details ERROR:', err);
            this.globals.hideLoading();
          });
        })
      });
    }
    ionViewWillLeave() {
      this.events.unsubscribe('documentDetails-refresh');
      console.log('unsubscribe   ApertePage');
    }


    ngOnInit() {
      if(this.globals.noleggio.PraticaID != null)
      {
        this.praticaID = this.globals.noleggio.PraticaID;

        let elPratiche = this.globals.praticaList.filter(it => {
          return (it.ID == this.praticaID);
        });

        if(elPratiche.length > 0)
        {
          this.relPratica = elPratiche[0];
        }


      }

      //di default lascio documento a 100
      let tipoID = 100;
      if(this.globals.rientro != null) {
        console.log('RESTITUZIONE');
        tipoID = 101;
      } else {
        console.log('INSERIMENTO O UPDATE');
        tipoID = 100;
      }

      this.globals.showLoading().then(() => {

        console.log('STA PER FARE IL CHECK:');
        
        //Verifico se esiste già il documento di questo tipo per il noleggio
        //a differenza delle pratiche ne possono esistere massimo 2
        this.documentsProvider.checkRentDocuments(this.globals.noleggio.ID, tipoID).then((res: any) => {
          if (res.length > 0 && res.length == 1) {
            console.log('RISULTATO CHECK:');
            console.log(res);
            //Esiste già il documento
            this.globals.hideLoading();
            this.document.ID = res[0].ID;
            this.document.NoleggioID = res[0].NoleggioID;
            this.document.Url = res[0].Url;
            this.document.Thumb = res[0].Thumb;
            this.document.TipoId = tipoID;

            //Il documento è già firmato
            this.firmePresenti = true;

            this.globals.hideLoading();
            
          } else {

            this.documentsProvider.addDocumentTemp(this.globals.noleggio.ID, tipoID, null, null, null, true, null).then((res: any) => {

              this.globals.hideLoading();
              this.document.ID = res.docID;
              this.document.NoleggioID = res.ID;
              this.document.Url = res.Url;
              this.document.Thumb = res.ThumbUrl;
              this.document.TipoId = tipoID;

              //console.log('response: ', res);
              /*this.is_changed = true;
             
              this.vc.dismiss({is_changed: this.is_changed});*/
            }).catch(err => {
              console.log('error getting noleggio document temp: ', err);
              this.globals.hideLoading();

            })

          }

        }).catch(err => {
          console.log('error getting noleggio document list: ', err);
          this.globals.hideLoading();

        });


       });
     
    }

    convertToLocalDate(ios_date_str: string) {
      let d = new Date(ios_date_str);
      return d.toLocaleDateString();
    }
    
    showDocumentDetails(): void {

      this.navCtrl.push(PdfPreviewPage, {document: this.document});

    }

    getDanniSegnallati() {
      let str = "";
      for (let i = 0; i < this.globals.noleggio.Sinistri.length; i++) {
        if (this.globals.noleggio.Sinistri[i].NoleggioID == this.globals.noleggio.ID) {
          if (i == this.globals.noleggio.Sinistri.length - 1) {
            str += this.globals.noleggio.Sinistri[i].Sinistro;
          }
          else {
            str += (this.globals.noleggio.Sinistri[i].Sinistro + ", ");
          }
        }
      }

      return str;
    }

    backNoleggi(): void {
      //TODO: Qui verifico se la lettera è firmata o meno (prima di concludere)
      this.navCtrl.push(CarRentalPage);
    }

    associaPratica(): void {
      var params = {
        title: "Associa Pratica",
        praticaID: this.globals.noleggio.PraticaID
      }

      let modal = this.modalCtrl.create(PraticheModalPage, params, {cssClass: "options-modal"});
      modal.present();
      modal.onDidDismiss((data) => {
        if (data != null && data.is_changed) {
          //Restituisce i dati della pratica che servono
          if(data.praticaID != null)
          {
            this.praticaID = data.praticaID;
            let elPratiche = this.globals.praticaList.filter(it => {
              return (it.ID == this.praticaID);
            });

            if(elPratiche.length > 0)
            {
              this.relPratica = elPratiche[0];
              //Chiama la API che collega la pratica
              this.globals.showLoading().then(() => {
                this._carRental.updatePraticaAssociata(this.globals.noleggio.ID, this.relPratica.ID).then(res => {
                  this.globals.hideLoading();
                  console.log("Update Pratica response: ", res);
                  if(res == "OK" || res.success){
                    this.globals.showToastSuccess('Pratica associata con successo.');
                  } else {
                    this.globals.showToastError('Errore associazione pratica.' + res.message);
                  }
                })
                .catch(err => {
                  this.globals.hideLoading();
                  console.log("Update Pratica errors: ", err);
                  this.globals.showToastError('ERRORE: ' + err);
                });
              }); 
            }
          }
          
        }
      })
    }

    annullaAssociazione(): void {
      this.praticaID = null;

      this.globals.showLoading().then(() => {
        this._carRental.updatePraticaAssociata(this.globals.noleggio.ID, null).then(res => {
          this.globals.hideLoading();
          console.log("Update Pratica response: ", res);
          if(res == "OK" || res.success){
            this.globals.showToastSuccess('Associazione annullata con successo.');
          } else {
            this.globals.showToastError('Errore annullamento associazione.' + res.message);
          }
        })
        .catch(err => {
          this.globals.hideLoading();
          console.log("Update Pratica errors: ", err);
          this.globals.showToastError('ERRORE: ' + err);
        });
      }); 

      //Chiama la API che scollega la pratica
    }

    creaPraticaNoleggio(): void {
      this.globals.praticaTipoID = Constants.CREATION_CASE.NOLEGGIO;
      this.navCtrl.push(InsertPracticePage, { Targa: this.globals.targaVeicolo, NoleggioID: this.globals.noleggio.ID });
    }

    goPractice(id: number): void {
      //Imposto comunque la global, non si sa mai...
      this.globals.praticaTipoID = this.relPratica.TipoID;
      this.navCtrl.push(PracticeEditPage, {ID: this.relPratica.ID, TipoID: this.relPratica.TipoID });
      

    }

}