import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PdfPreviewPage } from '../../../shared/pdf-preview/pdf-preview';
import { DocumentItem } from '../../../../../models/document';

@Component({
  selector: 'documents-tab',
  templateUrl: 'documents-tab.html'
})
export class DocumentsTabComponent {
	@Input() documents: DocumentItem[] = [];
	@Input() practicaID: number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
    
  }

  showDocumentDetails(documentItem: DocumentItem): void {
    this.navCtrl.push(PdfPreviewPage, {document: documentItem});
  }
}