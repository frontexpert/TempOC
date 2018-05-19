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
  
  pdfSrc: string = './assets/pdf-test.pdf';
  title: string = 'Privacy';
  docData: DocumentItem;

  constructor(public navCtrl: NavController, params: NavParams, public modalCtrl: ModalController, private file: File, public transfer: FileTransfer, private globals: Globals) {
    // set the title if params are exist
    if (params.get('document')) {
      this.docData = params.get('document');

      if (this.globals.isPhonegap()) {
        this.downloadFile(this.docData.Url, this.docData.Filename);
      } else {
        // set pdf url for browser     
        this.pdfSrc = this.docData.Url;        
      }
      // set title
      this.title = this.docData.Nome;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PdfPreviewModalPage');
  }

  firstSign(): void {
    this.modalCtrl.create(SignatureModalPage, {title: "Firma 1"}).present();
  }

  secondSign(): void {
    this.modalCtrl.create(SignatureModalPage, {title: "Firma 2"}).present();
  }

  private downloadFile(url: string, fileName: string) {
    this.globals.showLoading().then(() => {
      this.file.checkFile(this.file.dataDirectory, fileName)
        .then((isExist: boolean) => {
          if (isExist) {
            this.pdfSrc = this.file.dataDirectory + fileName;
            this.globals.hideLoading();
          }
          else {
            // download file
            const fileTransfer: FileTransferObject = this.transfer.create();

            fileTransfer.download(url, this.file.dataDirectory + fileName).then((entry) => {
              console.log('download complete: ' + entry.toURL());
              this.pdfSrc = entry.toURL();
              this.globals.hideLoading();
            }, (error) => {
              // handle error
              console.log('download error: ' + error);
              this.globals.hideLoading();
            });
          }
        });
    });  
  }
}
