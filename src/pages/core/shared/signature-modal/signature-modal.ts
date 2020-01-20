import { Component, ViewChild } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { DocumentsProvider } from '../../../../providers/documents';
import { Globals } from '../../../../shared/globals';

/**
 * Generated class for the SignatureModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signature-modal',
  templateUrl: 'signature-modal.html',
})
export class SignatureModalPage {
  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  @ViewChild('drawPad') drawPadEl: any;

  digital_signature: any;
  title: string;
  is_changed: boolean = false;

  constructor(public vc: ViewController, 
              public navParams: NavParams,
              private documentsProvider: DocumentsProvider, 
              public globals: Globals) {
  }

  ngOnInit() {
    this.title = this.navParams.get('title');
  }

  ionViewDidLoad() {
    console.log('SignatureModalPage ionViewDidLoad');

    // this.signaturePad is now available
    window.onresize = this.resizeCanvas.bind(this);
    this.resizeCanvas();
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
    console.log('SignatureModalPage ionViewDidLoad. digital_signature:');
    console.log(this.digital_signature);
  }

  private resizeCanvas(): void {
    var el: HTMLDivElement = this.drawPadEl.nativeElement;
    let width = el.clientWidth;
    let height = el.clientHeight - 44; // reduce header height
    // let ratio =  Math.max(window.devicePixelRatio || 1, 1);    
    this.signaturePad.set('canvasWidth', width);
    this.signaturePad.set('canvasHeight', height);
    // canvas.getContext("2d").scale(ratio, ratio);
  }

  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    console.log(this.digital_signature);

    this.digital_signature = this.signaturePad.toDataURL();
  }
 
  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('SignatureModalPage begin drawing');
  }

  dismiss() {
    this.vc.dismiss({is_changed: this.is_changed, Firma : this.digital_signature});
  }

  done() {
    this.is_changed = true;

    this.vc.dismiss({is_changed: this.is_changed, Firma : this.digital_signature});
    
    // let params = {
    //   ID: this.navParams.get('ID'),
    //   Modello: this.navParams.get('Modello'),
    //   Posizione: this.navParams.get('Posizione'),
    //   Firme: [this.digital_signature]
    // }
    // this.globals.showLoading().then(() => {
    //   this.documentsProvider.addDocumentSignature(params).then((res) => {
    //     console.log('response: ', res);
    //     this.is_changed = true;
    //     this.globals.hideLoading();
    //     this.vc.dismiss({is_changed: this.is_changed});
    //   }).catch(err => {
    //     this.is_changed = false
    //     console.log('error: ', err);
    //     this.globals.hideLoading();
    //   })
    // });
  }

  clearSign() {
    this.signaturePad.clear();
  }

}
