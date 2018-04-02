import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
// import { DatePipe } from '@angular/common';

@IonicPage()
@Component({
  selector: 'page-pdf-preview',
  templateUrl: 'pdf-preview.html',
})
export class PdfPreviewPage {
  pdfSrc: string = './assets/pdf-test.pdf';
  title: string = 'Privacy';

  constructor(public viewCtrl: ViewController, params: NavParams) {
    // set the title if params are exist
    if (params.get('name')) {
      // this.title = params.get('name') + ' ' + this.datePipe.transform(params.get('created'), 'dd. MMM yyyy');
      this.pdfSrc = './assets/pdf-test.pdf'
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PdfPreviewModalPage');
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }
}
