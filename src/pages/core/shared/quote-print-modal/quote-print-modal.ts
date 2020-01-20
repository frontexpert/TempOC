import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Events, ViewController, NavParams } from 'ionic-angular';
import { PracticesProvider } from '../../../../providers/practices';
import { Globals } from '../../../../shared/globals';

/**
 * Generated class for the QuotePrintModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quote-print-modal',
  templateUrl: 'quote-print-modal.html',
})
export class QuotePrintModalPage {

  title: string;
  idPreventivo: number = 0;

  datiPreventivo: any = null;

  constructor(public vc: ViewController, 
              public navParams: NavParams,
              private praticaProvider: PracticesProvider, 
              public globals: Globals) {

  }

  ngOnInit() {
    this.title = this.navParams.get('title');
    this.idPreventivo = this.navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('OptionsModalPage ionViewDidLoad');

    // this.signaturePad is now available
    window.onresize = this.resizeCanvas.bind(this);
    this.resizeCanvas();
    //this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }

  private resizeCanvas(): void {
    /*var el: HTMLDivElement = this.drawPadEl.nativeElement;
    let width = el.clientWidth;
    let height = el.clientHeight - 44; // reduce header height
    // let ratio =  Math.max(window.devicePixelRatio || 1, 1);    
    this.signaturePad.set('canvasWidth', width);
    this.signaturePad.set('canvasHeight', height);
    // canvas.getContext("2d").scale(ratio, ratio);*/
  }

  dismiss() {
    this.vc.dismiss({datiPreventivo: this.datiPreventivo});
  }

  print(tipo: number)
  {
    this.globals.showLoading().then(() => {

      this.praticaProvider.printPreview(this.idPreventivo, tipo).then((res: any) => {

        this.datiPreventivo = res;
        this.vc.dismiss({datiPreventivo : this.datiPreventivo});
        this.globals.hideLoading();

      }).catch(err => {
        console.log('error getting noleggio document temp: ', err);
        this.globals.hideLoading();

      })

    });
    

    
  }

}
