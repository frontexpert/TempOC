import { Component, ViewChild } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

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

  constructor(public vc: ViewController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignatureModalPage');

    // this.signaturePad is now available
    window.onresize = this.resizeCanvas.bind(this);
    this.resizeCanvas();
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
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
    console.log('complete drawing');    
  }
 
  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('begin drawing');
  }

  dismiss() {
    this.vc.dismiss();
  }

  done() {

  }

  clearSign() {
    this.signaturePad.clear();
  }

}
