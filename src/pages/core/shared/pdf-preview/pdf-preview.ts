import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { SignatureModalPage } from '../signature-modal/signature-modal';
// import { DatePipe } from '@angular/common';
import { DocumentItem } from '../../../../models/document';

@IonicPage()
@Component({
  selector: 'page-pdf-preview',
  templateUrl: 'pdf-preview.html',
})
export class PdfPreviewPage {
  
  pdfSrc: string = './assets/pdf-test.pdf';
  title: string = 'Privacy';
  docData: DocumentItem;

  constructor(public navCtrl: NavController, params: NavParams, public modalCtrl: ModalController) {
    // set the title if params are exist
    if (params.get('document')) {
      this.docData = params.get('document');
      // set pdf url      
      this.pdfSrc = this.docData.Url;
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
}
