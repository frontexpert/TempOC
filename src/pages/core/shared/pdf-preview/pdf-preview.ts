import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { SignatureModalPage } from '../signature-modal/signature-modal';
// import { DatePipe } from '@angular/common';

@IonicPage()
@Component({
  selector: 'page-pdf-preview',
  templateUrl: 'pdf-preview.html',
})
export class PdfPreviewPage {
  //pdfSrc: string = './assets/binarydata.pdf';
  pdfSrc: string = './assets/pdf-test.pdf';
  title: string = 'Privacy';

  constructor(public navCtrl: NavController, params: NavParams, public modalCtrl: ModalController) {
    // set the title if params are exist
    if (params.get('name')) {
      // this.title = params.get('name') + ' ' + this.datePipe.transform(params.get('created'), 'dd. MMM yyyy');
      this.pdfSrc = './assets/pdf-test.pdf'
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
