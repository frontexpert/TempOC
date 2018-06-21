import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { SignatureModalPage } from '../signature-modal/signature-modal';
import { Globals } from '../../../../shared/globals';
import { DocumentItem } from '../../../../models/document';
import { File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';

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

  title: string = 'Privacy';
  docData: DocumentItem;
  isTwoSignatures: boolean = false;

  constructor(public navCtrl: NavController, params: NavParams, public modalCtrl: ModalController, private file: File, public transfer: FileTransfer, private globals: Globals) {
    // set the title if params are exist
    if (params.get('document')) {
      this.docData = params.get('document');
      if (this.docData.TipoId == 1 || this.docData.TipoId == 5) this.isTwoSignatures = true;
      this.pdfSrc.url = this.docData.Url;
      // if (this.globals.isPhonegap()) {
      //   this.downloadFile(this.docData.Url, this.docData.Filename);
      // } else {
      //   // set pdf url for browser     
      //   this.pdfSrc.url = this.docData.Url;        
      // }
      // set title
      this.title = this.docData.Nome;
    }
  }

  ionViewDidLoad() {
  }

  firstSign(): void {
    let params = {
      title: "Fima 1",
      ID: this.docData.ID,
      Modello: this.docData.TipoId,
      Posizione: 1
    }
    this.modalCtrl.create(SignatureModalPage, params).present();
  }

  secondSign(): void {
    let params = {
      title: "Fima 2",
      ID: this.docData.ID,
      Modello: this.docData.TipoId,
      Posizione: 2
    }
    this.modalCtrl.create(SignatureModalPage, params).present();
  }

  private downloadFile(url: string, fileName: string) {
    this.globals.showLoading().then(() => {
      this.file.checkFile(this.file.dataDirectory, fileName)
        .then((isExist: boolean) => {

          if (isExist) {
            setTimeout(() => {
              this.pdfSrc.url = this.file.dataDirectory + fileName;
              this.globals.hideLoading();
            }, 2000);
          }
          else {
            // download file
            const fileTransfer: FileTransferObject = this.transfer.create();

            fileTransfer.download(url, this.file.dataDirectory + fileName).then((entry) => {
              this.pdfSrc.url = entry.toURL();
              this.globals.hideLoading();
            }).catch((error) => {
              // handle error
              console.log('download error: ' + error);
              this.globals.hideLoading();
            });
          }

        }).catch(err => {
          console.log(err);
          const fileTransfer: FileTransferObject = this.transfer.create();
          fileTransfer.download(url, this.file.dataDirectory + fileName).then((entry) => {
            this.pdfSrc.url = entry.toURL();
            this.globals.hideLoading();
          }).catch((error) => {
            // handle error
            this.globals.hideLoading();
          });

        });
    });  
  }
}
