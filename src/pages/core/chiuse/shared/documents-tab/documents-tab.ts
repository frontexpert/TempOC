import { Component, Input } from '@angular/core';
import { NavController, NavParams, PopoverController, ViewController } from 'ionic-angular';
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
              public navParams: NavParams,
              public popoverCtrl: PopoverController) {
    
  }

  showDocumentDetails(documentItem: DocumentItem): void {
    this.navCtrl.push(PdfPreviewPage, {document: documentItem});
  }

  presentDocumentNewMenu(evt) {
    let popover = this.popoverCtrl.create(DocumentNewPopoverPage);
    popover.present({
      ev: evt
    });
  }
}

@Component({
  template: `
    <ion-list no-padding>      
      <button ion-item (click)="close()">Cessione credito</button>
      <button ion-item (click)="close()">Avviso Presenza Testimoni</button>
      <button ion-item (click)="close()">Richiesta vettura sostitutiva</button>
      <button ion-item (click)="close()">Atto notorieta</button>
      <button ion-item (click)="close()">Informativa privacy</button>
    </ion-list>
  `
})
export class DocumentNewPopoverPage {
  constructor(public viewCtrl: ViewController) {}

  close() {
    this.viewCtrl.dismiss();
  }
}