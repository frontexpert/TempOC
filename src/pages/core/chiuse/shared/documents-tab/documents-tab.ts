import { Component, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PdfPreviewPage } from '../../../shared/pdf-preview/pdf-preview';

@Component({
  selector: 'documents-tab',
  templateUrl: 'documents-tab.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentsTabComponent implements AfterViewInit {
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private ref: ChangeDetectorRef) {
    
  }
  
  // Wait until the view inits before disconnecting
  ngAfterViewInit() {
    // Since we know the list is not going to change
    // let's request that this component not undergo change detection at all
    this.ref.detach();
  }

  showDocumentDetails(): void {
    this.navCtrl.push(PdfPreviewPage);
  }
}