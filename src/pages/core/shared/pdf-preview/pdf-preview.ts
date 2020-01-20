import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams, ModalController, Events } from 'ionic-angular';
import { SignatureModalPage } from '../signature-modal/signature-modal';
import { OptionsModalPage } from '../options-modal/options-modal';
import { Globals } from '../../../../shared/globals';
import { PraDocumentItem } from '../../../../models/praDocument';
import { RentDocumentItem } from '../../../../models/rentDocument';
// import { File } from '@ionic-native/file';
// import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { DocumentsProvider } from '../../../../providers/documents';
import { PDFProgressData, PDFDocumentProxy } from 'ng2-pdf-viewer';

@IonicPage()
@Component({
  selector: 'page-pdf-preview',
  templateUrl: 'pdf-preview.html',
})
export class PdfPreviewPage {
  
  pdfSrc: any = { 
    url: './assets/pdf-test.pdf'//,
    //length: 65536 * 65536 * 65536 
  }

  //title: string = 'Privacy';
  //docData: RentDocumentItem;
  docData: any; //PraDocumentItem;
  parentID: number;
  isPreventivo: boolean = false;
  isTwoSignatures: boolean = false;
  isThreeSignatures: boolean = false;
  signatures  = new Array(3);
  opzioni2: any;
  opzioni3: any;
  opzioni4: any;
  //options: boolean = false;
  refresh: boolean = false;
  signatureComplete = false;
  saved = false;
  rentTab: boolean = false;
  isLoading: boolean = false;
  public unregisterBackButtonAction: any;

  constructor(public navCtrl: NavController, params: NavParams, public modalCtrl: ModalController, public globals: Globals, private documentsProvider: DocumentsProvider, private alert: AlertController, public events: Events) {
    //verify if we're coming from rentTab view
    if (params.get('rentTab')) {
      this.rentTab = true;
    }

    // set the title if params are exist
    if (params.get('document')) {
      this.docData = params.get('document');

      this.parentID = this.docData.PraticaID != null ? this.docData.PraticaID : this.docData.NoleggioID;
      //this.parentID = this.docData.NoleggioID;

      //Faccio un check del tipo documento e assegno l'id padre
       if(this.docData.TipoId != 100 && this.docData.TipoId != 101)
       {
         //E' una pratica
         if(this.docData.PraticaID != null && this.docData.PraticaID > 0)
         {
           this.parentID = this.docData.PraticaID; 
         }
       } else {
         //E' un noleggio
         if(this.docData.NoleggioID != null && this.docData.NoleggioID > 0)
         {
           this.parentID = this.docData.NoleggioID; 
         }
       }


      //docData.TipoId == 100 ---> Lettera di Noleggio
      if (this.docData.ID != null && this.docData.ID > 0) {
        this.saved = true;
      }

      if (this.docData.TipoId == 1 || this.docData.TipoId == 5 || this.docData.TipoId == 100) {
        this.isTwoSignatures = true;
        this.signatures = new Array(2);
      }
      if (this.docData.TipoId == 101) {
        //this.isTwoSignatures = false;
        this.signatures = new Array(1);
      }
      
      this.pdfSrc.url = this.docData.Url;
      

    } 

    if(params.get('datiPreventivo'))
    {
      this.isPreventivo = true;
      this.docData = params.get('datiPreventivo');
      this.pdfSrc.url = this.docData.Url;
    }

   

  }

  ionViewDidLoad() {
    
  }

  ionViewWillLeave(){
    
  }

  ionViewCanLeave() {

    if(this.docData.TipoId == 100 || this.docData.TipoId == 101)
    {
       if(this.saved && this.docData.PraticaID == null && this.rentTab == false)
      {
         //caso rigenera, posso tornare indietro tranquillamente
         console.log('INDIETRO CON RIGENERA');
         this.events.publish("documentDetails-ricarica", true);
       }

       let nonFirmato = false;
       //Caso 1 firma
       if(this.docData.TipoId > 0 && !this.saved){
        if(!this.signatures[0])
        {
          nonFirmato = true;
        }
       }
       //Caso 2 firme
       if(this.isTwoSignatures && !this.saved){
        if(!this.signatures[1])
        {
          nonFirmato = true;
        }
       }
       //Caso 3 firme
       if(this.isThreeSignatures && !this.saved){
        if(!this.signatures[2])
        {
          nonFirmato = true;
        }
       }

       if(nonFirmato == true)
       {
        return new Promise((resolve, reject) => {
          let confirm = this.alert.create({
              message: 'Non hai completato le firme, se esci ora i cambiamenti verranno persi. Confermi?',
              buttons: [
                  {
                  text: 'Sì',
                  handler: () => {
                   this.events.publish("documentDetails-ricarica", false);
                   resolve();
                  }
                  },
                  {
                  text: 'No',
                  handler: () => {
                    reject();
                  }
                }
              ]
              });
          confirm.present();
        });
       }
     }

  }

  compilaOpzioni(): void {

    console.log('PdfPreviewPage. COMPILA OPZIONI');
    console.log('PdfPreviewPage. DOCDATA TIPO ID= ' + this.docData.TipoId);

    var params = {
      title: "Compila opzioni",
      ID: this.parentID,
      Modello: this.docData.TipoId,
      Opzioni2: this.opzioni2,
      Opzioni3: this.opzioni3,
      Opzioni4: this.opzioni4
    }

    let modal = this.modalCtrl.create(OptionsModalPage, params, {cssClass: "options-modal"});
    modal.present();
    modal.onDidDismiss((data) => {
      if (data != null && data.is_changed) {
        this.opzioni2 = null;
        this.opzioni3 = null;
        this.opzioni4 = null;
        switch(this.docData.TipoId)
        {
          case 2: {
            this.opzioni2 = data.Campi;
            break;
          }
          case 3: {
            this.opzioni3 = data.Campi;
            break;
          }
          case 4: {
            this.opzioni4 = data.Campi;
            break;
          }
        }
        this.refreshDoc();
      }
    })
    
  }

  firstSign(): void {
    let params = {
      title: "Firma 1",
      ID: this.parentID,
      Modello: this.docData.TipoId,
      Posizione: 1
    }
    let modal = this.modalCtrl.create(SignatureModalPage, params, {cssClass: "signature-modal"});
    modal.present();
    modal.onDidDismiss((data) => {
      if (data.is_changed) {
        this.signatures[0] = data.Firma;
        this.refreshDoc();
      }
    })
    
  }

  secondSign(): void {
    let params = {
      title: "Firma 2",
      ID: this.parentID,
      Modello: this.docData.TipoId,
      Posizione: 2
    }
    let modal = this.modalCtrl.create(SignatureModalPage, params, {cssClass: "signature-modal"});
    modal.present();
    modal.onDidDismiss((data) => {
      if (data.is_changed) {
        this.signatures[1] = data.Firma;
        this.refreshDoc();
      }
    })
  }

  thirdSign(): void {
    let params = {
      title: "Firma 3",
      ID: this.parentID,
      Modello: this.docData.TipoId,
      Posizione: 3
    }
    let modal = this.modalCtrl.create(SignatureModalPage, params, {cssClass: "signature-modal"});
    modal.present();
    modal.onDidDismiss((data) => {
      if (data.is_changed) {
        this.signatures[2] = data.Firma;
        this.refreshDoc();
      }
    })
  }

  rigenera(): void {
    
    // if (this.docData.TipoId == 1 || this.docData.TipoId == 5 || this.docData.TipoId == 100) {
    //   this.isTwoSignatures = true;
    //   this.signatures = new Array(2);
    // }
    // if(this.docData.TipoId == 101) {
    //   this.isTwoSignatures = false;
    //   this.isThreeSignatures = false;
    //   this.signatures = new Array(1);
    // }

    this.saved = false;
   
    this.signatureComplete = false;
    
    this.documentsProvider.addDocumentTemp(this.parentID, this.docData.TipoId, true, this.opzioni2, this.opzioni3, this.opzioni4, this.signatures).then((res: any) => {
      setTimeout(() => {

        // if(this.docData.TipoId != 100 && this.docData.TipoId != 101)
        // {
         
        //   //E' una pratica
        //   this.docData.PraticaID = res.ID;

        // } else {
        //   //E' un noleggio
        //   this.docData.NoleggioID = res.ID;
        // }
        
        this.docData.ID = res.docID;
        this.docData.Url = res.Url;
        this.docData.Thumb = res.ThumbUrl;
        this.pdfSrc.url = this.docData.Url;
        this.refreshDoc();
      }, 100);

    })

  }

  refreshDoc(): void {
    this.refresh = true;
    console.log('PdfPreviewPage. refreshDoc SIGNATURES' + this.signatures)
    this.documentsProvider.addDocumentTemp(this.parentID, this.docData.TipoId, true, this.opzioni2, this.opzioni3, this.opzioni4, this.signatures).then((res: any) => {
      setTimeout(() => {
        this.refresh = false;
        if (!this.isTwoSignatures && !this.isThreeSignatures && this.signatures[0] != null) this.signatureComplete = true;
        if (this.isTwoSignatures && this.signatures[0] != null && this.signatures[1] != null) this.signatureComplete = true;
        if (this.isThreeSignatures && this.signatures[0] != null && this.signatures[1] != null && this.signatures[2] != null) this.signatureComplete = true;
      }, 100);

    })
  }

  onProgress(progressData: PDFProgressData) {

    if(this.isLoading == false)
    {
      this.isLoading = true;
      this.globals.showLoading();
    }
    /*this.globals.showLoading().then(() => {
      if(progressData.loaded)
      {
        this.globals.hideLoading();
      }
    });*/
    
    // do anything with progress data. For example progress indicator
    
  }

  pageRendered(e: CustomEvent) {
    this.globals.hideLoading();
  }
  
  showProgress() {
    
  }

  save(): void {
    this.signatureComplete = false;
    //save and then refresh
    this.documentsProvider.addDocumentTemp(this.parentID, this.docData.TipoId, false, this.opzioni2, this.opzioni3, this.opzioni4, this.signatures).then((res: any) => {
      if (res.success == null || res.success){

        

        this.navCtrl.pop().then(() =>{

          

          //sono in una pratica o in un noleggio?
          if(this.docData.TipoId != 100 && this.docData.TipoId != 101)
          {
            this.events.publish("documentDetails-refresh");
          } else {
            this.events.publish("documentDetails-ricarica", true);
            //this.docData.ID = res.docID;
            
          }
          
        }  );

      } else {
        //this.signatureComplete = true;
        this.globals.showToastError('Si è verificato un errore sul server salvando il documento: ' + res.message);
        
      }

    }).catch(error =>{
      this.globals.showToastError('Si è verificato un errore salvando il documento');
    })


  }

}
