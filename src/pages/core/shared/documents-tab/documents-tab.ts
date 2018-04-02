import { Component, EventEmitter, Output, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PdfPreviewPage } from '../../pdf-preview/pdf-preview';

@Component({
  selector: 'documents-tab',
  templateUrl: 'documents-tab.html'
})
export class DocumentsTabComponent {
  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
    
  }

  showDocumentDetails(): void {
    this.navCtrl.push(PdfPreviewPage);
  }
}