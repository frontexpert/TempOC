import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';
import { ModalController, AlertController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { AssegnaGaranteModalPage } from '../../assegna-garante-modal/assegna-garante-modal';
import { GestioneAutonomaModalPage } from '../../gestione-autonoma-modal/gestione-autonoma-modal';
import { Globals } from '../../../../../shared/globals';
import { PracticesProvider } from '../../../../../providers/practices';
import * as Constants from '../../../../../shared/constants';
declare var cordova: any;

@Component({
  selector: 'payment-tab',
  templateUrl: 'payment-tab.html'
})
export class PaymentTabComponet implements OnChanges {

  @Input() paymentDetails: any;

  // pie
  colorScheme = {
    domain: ['#ff8ba4', '#86c7f3', '#ffe29a', '#AAAAAA']
  };

  custCol = [
    {
      name: "payed",
      value: 'green'
    },
    {
      name: "notPayed",
      value: 'red'
    }
  ];

  ngOnChanges(changes: SimpleChanges) {

    if(this.paymentDetails != null && this.paymentDetails != undefined && this.paymentDetails.DatiPratica != null && this.paymentDetails.DatiPratica != undefined && this.paymentDetails.DatiPratica.DataInvioPec != null)
    {

      console.log('AUTOGESTIONE= ' + this.paymentDetails.GaranteAutogestione);
      
      //var invioPec = new Date(this.paymentDetails.DatiPratica.DataInvioPec);
      var invioPec = new Date(2018, 7, 25);

      var scadenza = new Date(2018, 9, 22);
      //var scadenza = new Date(this.paymentDetails.ScadenzaPagamento);

      var oggi = new Date(Date.now());

      if(scadenza >= oggi)
      {
        //l'utente ha pagato?
        if(this.paymentDetails.DataPagamento != null)
        {

            this.single = [{
              "name": "Rimanenti",
              "value": 0
            },
            {
              "name": "payed",
              "value": 100
            }];

        } else {
          var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
          //calcola i trascorsi
          var trascorsi = Math.round(Math.abs((invioPec.getTime() - oggi.getTime())/(oneDay)));
  
          //calcola i rimanenti    
          var rimanenti = Math.round(Math.abs((oggi.getTime() - scadenza.getTime())/(oneDay)));
  
          this.single = [{
            "name": "Rimanenti",
            "value": rimanenti
          },
          {
            "name": "Trascorsi",
            "value": trascorsi
          }];
        }


      } else {
          this.single = [{
            "name": "Rimanenti",
            "value": 0
          },
          {
            "name": "notPayed",
            "value": 100
          }
        ];
      }
     
    } else {

      console.log('AUTOGESTIONE= ' + this.paymentDetails.GaranteAutogestione);

      if(this.paymentDetails.DataPagamento != null)
      {
        this.single = [{
            "name": "Rimanenti",
            "value": 0
          },
          {
              "name": "payed",
              "value": 100
          }
        ];
      } else {
        this.single = [{
            "name": "Rimanenti",
            "value": 0
          },
          {
            "name": "notPayed",
            "value": 100
          }
        ];
      }

    }
    

  }

  showLabels = false;
  explodeSlices = false;
  doughnut = false;
  view: any[] = [130, 130];

  single = []; 

  constructor(private transfer: FileTransfer, private file: File, public modalCtrl: ModalController, public globals: Globals, private alert: AlertController, public pprovider: PracticesProvider) {

    this.single = [{
      "name": "Rimanenti",
      "value": 0
    },
    {
      "name": "notPayed",
      "value": 100
    }
  ];

  }

  ngOnInit() {
    
  }

  onSelect(event) {
    console.log('PaymentTabComponent onSelect event:');
    console.log(event);
  }

  openLink = function(id) {
    
    var link = Constants.OXYGEN_URL + "/Fatturatore/PrintFatturaBase?ID=" + id;
		window.open(link, '_system');
  };
  
  assegnaGarante() {
    //alert(this.paymentDetails.DatiPratica.ID);
    console.log(this.paymentDetails);

    var params = {
      title: "Selezione del garante",
      practicaID: this.paymentDetails.ID
    }
    
    let modal = this.modalCtrl.create(AssegnaGaranteModalPage, params, {cssClass: "options-modal"});
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

        //Se il garante è stato assegnato aggiorno i dati di playmentDetails
        if(campi.cambio == true)
        {
          this.globals.showLoading().then(() => {
            this.pprovider.getPaymentDetails(this.paymentDetails.ID).then((res: any) => {
              console.log(res);
              this.paymentDetails = res;
              this.globals.hideLoading();
            });
          }); 
        }
        
    })
  }

  assegnaGestioneAutonoma() {
    
    let confirm = this.alert.create({
      title: 'Confermi?',
      message: 'Vuoi gestire la pratica in autonomia?',
      buttons: [
        {
          text: "Cancella",
          handler: () => {
            console.log('Annullamento selezione gestione pratica autonoma.');
          }
        },
        {
          text: 'OK',
          handler: () => {
            this.globals.showLoading().then(() => {
              this.pprovider.updateGaranteAutogestione(this.paymentDetails.ID, true).then((res: any) => {
                console.log(res);
                if(res.success == true && res.message == "OK")
                {
                  //Ricarico i dettagli del pagamento
                  this.pprovider.getPaymentDetails(this.paymentDetails.ID).then((res: any) => {
                    console.log(res);
                    this.paymentDetails = res;
                    
                  });
                } else {
                  this.globals.showToastError('ERRORE: ' + res.message);
                }
                this.globals.hideLoading();
                //this.paymentDetails = res;
                //this.globals.hideLoading();
              });
            }); 
          }
        }
      ]
    });
    confirm.present();

  }

  assegnaAdUnGarante() {

    let confirm = this.alert.create({
      title: 'Confermi?',
      message: 'Vuoi assegnare la pratica ad un garante?',
      buttons: [
        {
          text: "Cancella",
          handler: () => {
            console.log('Annullamento selezione gestione pratica autonoma.');
          }
        },
        {
          text: 'OK',
          handler: () => {
            this.globals.showLoading().then(() => {
              this.pprovider.updateGaranteAutogestione(this.paymentDetails.ID, false).then((res: any) => {
                console.log(res);
                this.paymentDetails = res;
                this.globals.hideLoading();
              });
            });
          }
        }
      ]
    });
    confirm.present();

  }

  gestioneAutonoma() {
    
    var params = {
      title: "Gestione pratica in autonomia",
      practicaID: this.paymentDetails.ID
    }

    let modal = this.modalCtrl.create(GestioneAutonomaModalPage, params, {cssClass: "options-modal"});
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
      
    })

  }

  //per ora commentata
  /*downloadFile(id){

    var url = "http://oxygen2.ilcarrozziere.it/Fatturatore/PrintFatturaBase?ID=" + id;
             var filename = url.split("/").pop();
             var targetPath = cordova.file.externalRootDirectory + filename;

    const transfer = this.transfer.create();
    transfer.download(url, targetPath).then(entry => {
      console.log('download completato');
    }, (error) => {
        console.log(error);
    });

   
  }*/

}