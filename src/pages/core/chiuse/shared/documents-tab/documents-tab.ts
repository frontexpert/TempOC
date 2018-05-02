import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PdfPreviewPage } from '../../../shared/pdf-preview/pdf-preview';

@Component({
  selector: 'documents-tab',
  templateUrl: 'documents-tab.html'
})
export class DocumentsTabComponent {
	@Input() documents: any[] = [];
	@Input() practicaID: number;
  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
    
  }

  showDocumentDetails(): void {
    this.navCtrl.push(PdfPreviewPage);
  }
}