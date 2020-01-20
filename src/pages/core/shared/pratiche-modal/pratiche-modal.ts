import { Component } from '@angular/core';
import { NavController, Events, ViewController, NavParams } from 'ionic-angular';
import { Globals } from '../../../../shared/globals';
import { PracticesProvider } from '../../../../providers/practices';

/**
 * Generated class for the PraticheModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-pratiche-modal',
  templateUrl: 'pratiche-modal.html'
})
export class PraticheModalPage {
 
  searchTerm: string = '';
  
  activeItemID: number;         // active item ID

  pratiche_list: Array<any> = [];

  is_changed: boolean = false;
  praticaID: number = 0;

  options: any = {
    title: "",
    tipo: 0
  }

  

  constructor(public navCtrl: NavController, public vc: ViewController,
              public _practices: PracticesProvider, 
              public navParams: NavParams,
              public globals: Globals, public events: Events) {

                
               
  }

  ngOnInit() {

    
    //In ogni caso setto le opzioni a zero e le reinizializzo in base al tipo documento
    this.pratiche_list = this.globals.praticaList;

    if(this.navParams.get('praticaID') != null)
    {
      this.activeItemID = this.navParams.get('praticaID'); 
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PraticheModalPage');

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

  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    //this.digital_signature = this.signaturePad.toDataURL();
  }
 
  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    //console.log('begin drawing');
  }

  dismiss() {
    this.vc.dismiss({is_changed: this.is_changed, praticaID : this.activeItemID});
  }

  done(tipo) {
    
    let isIncomplete : string = '';
    //Qui metto i controlli caso per caso

    if(isIncomplete == '')
    {
      this.is_changed = true;
      this.vc.dismiss({is_changed: this.is_changed, praticaID : this.activeItemID});
    }
    
  }

  clearSelection() {
    
  }

  selectPraticeItem(item) {
    console.log('PraticheModalPage select pratica ITEM ID');
    console.log(item.ID);
    this.activeItemID = item.ID;
    console.log('PraticheModalPage select pratica ACTIVE ITEM ID');
    console.log(this.activeItemID);
  }

  onChangeTime(input) {

    this.pratiche_list = this.globals.praticaList.filter(it => {
      let P1_NomeCompleto = it.P1_Nome + " " + it.P1_Cognome;
    	return (it.P1_Targa.indexOf(input.value) > -1 ||
              P1_NomeCompleto.indexOf(input.value) > -1 ||
              (it.P1_Marca != null && it.P1_Marca.indexOf(input.value) > -1) ||
              (it.P1_Modello != null && it.P1_Modello.indexOf(input.value) > -1) ||
              (it.P1_VeicoloMarcaID != null && it.P1_VeicoloMarca.indexOf(input.value) > -1) ||
              (it.P1_VeicoloModelloID != null && it.P1_VeicoloModello.indexOf(input.value) > -1));
    });

  }

}
