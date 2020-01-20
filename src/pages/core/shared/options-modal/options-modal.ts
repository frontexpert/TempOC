import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Events, ViewController, NavParams } from 'ionic-angular';
import { DocumentsProvider } from '../../../../providers/documents';
import { Globals } from '../../../../shared/globals';

/**
 * Generated class for the OptionsModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-options-modal',
  templateUrl: 'options-modal.html',
})
export class OptionsModalPage {
 
  is_changed: boolean = false;

  options: any = {
    title: "",
    tipo: 0
  }

  campi: any;

  errore: any = {
    danniACose: '',
    testimoni: '',
    generalitaTestimone: '',
    motivazioni: '',
    soggetto_privato: '',
  };

  constructor(public vc: ViewController, 
              public navParams: NavParams,
              private documentsProvider: DocumentsProvider, 
              public globals: Globals) {

  }

  ngOnInit() {
    this.options.title = this.navParams.get('title');
    this.options.tipo = this.navParams.get('Modello');

    //In ogni caso setto le opzioni a zero e le reinizializzo in base al tipo documento
    this.azzeraCampi(this.options.tipo);

    switch(this.options.tipo)
    {
      case 2:
        if(this.navParams.get('Opzioni2') != null)
        {
          this.campi = this.navParams.get('Opzioni2');
        }
      break;
      case 3:
        if(this.navParams.get('Opzioni3') != null)
        {
          this.campi = this.navParams.get('Opzioni3');
        }
      break;
      case 4:
        if(this.navParams.get('Opzioni4') != null)
        {
          this.campi = this.navParams.get('Opzioni4');
        }
      break;
    }

    

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OptionsModalPage');

    // this.signaturePad is now available
    window.onresize = this.resizeCanvas.bind(this);
    this.resizeCanvas();
    //this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
    console.log('OptionsModalPage ionViewDidLoad -> this.campi: ');
    console.log(this.campi);
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
    this.vc.dismiss({is_changed: this.is_changed, Campi : this.campi});
  }

  done(tipo) {
    this.errore = {
      danniACose: '',
      testimoni: '',
      generalitaTestimone: '',
      motivazioni: '',
      soggetto_privato: '',
    };
    let isIncomplete : string = '';
    //Qui metto i controlli caso per caso
    switch(tipo) { 
      case 2: { 
          if(this.campi.danniACose == '')
          {
            this.errore.danniACose = '** Campo obbligatorio **';
            isIncomplete = 'si';
          }
          if(this.campi.testimoni == '')
          {
            this.errore.testimoni = '** Campo obbligatorio **';
            isIncomplete = 'si';
            
          }
          if(this.campi.generalitaTestimone == '')
          {
            this.errore.generalitaTestimone = '** Campo obbligatorio **';
            isIncomplete = 'si';
            
          }

          if(this.campi.generalitaTestimone != '' && (this.campi.nomeCognomeTestimone == '' || this.campi.nomeCognomeTestimone == null))
          {
            this.errore.generalitaTestimone = '** Specificare nome e cognome testimone **';
            isIncomplete = 'si';
          }

         break; 
      }
      case 3: { 
          if(this.campi.professionali == false && this.campi.lavorative == false && this.campi.attivita_quotidiane == false && this.campi.altro == false)
          {
            this.errore.motivazioni = '** Inserire almeno una voce tra quelle disponibili **';
            isIncomplete = 'si';
          }
          if(this.campi.altro == true && (this.campi.specifica_altro == '' || this.campi.specifica_altro == null))
          {
            this.errore.motivazioni = '** Compilare la voce "specifica altro" **';
            isIncomplete = 'si';
            
          }
        break; 
     } 
     case 4: { 
        if(this.campi.soggetto_privato == '' && this.campi.risarcimento == '')
        {
          this.errore.soggetto_privato = '** Specificare una voce tra quelle disponibili **';
          isIncomplete = 'si';
          
        }
        if(this.campi.risarcimento == 'parzialmente_indetraibile_var' && (this.campi.percentuale_indetraibile == '' || this.campi.percentuale_indetraibile == null))
        {
          this.errore.soggetto_privato = '** Specificare la percentuale indetraibile. **';
          isIncomplete = 'si';
         
        }
        if(this.campi.percentuale_indetraibile != '' && this.campi.percentuale_indetraibile != null)
        {

          var result = (this.campi.percentuale_indetraibile - Math.floor(this.campi.percentuale_indetraibile)) !== 0; 

          if(!(/^[0-9,.]*$/.test(this.campi.percentuale_indetraibile)))
          {
            this.errore.soggetto_privato = '** Inserisci una percentuale numerica. **';
            isIncomplete = 'si';
          }
        }
      break; 
     } 
    }

    if(isIncomplete == '')
    {
      this.is_changed = true;
      this.vc.dismiss({is_changed: this.is_changed, Campi : this.campi});
    }
    
  }

  azzeraCampi(tipo) {
    switch(tipo) { 
      case 2: { 
          this.campi = {
            danniACose: '',
            testimoni: '',
            generalitaTestimone: '',
            nomeCognomeTestimone: ''
          }; 
         break; 
      }
      case 3: { 
          this.campi = {
            professionali: false,
            lavorative: false,
            attivita_quotidiane: false,
            altro: false,
            specifica_altro: ''
          };
        
        break; 
     } 
     case 4: { 
        this.campi = {
          soggetto_privato: '',
          risarcimento: '',
          percentuale_indetraibile: ''
        };
      break; 
     } 
     default: {
       this.campi = null;
     }
     break;
    }
  }

  clearSign() {
    this.azzeraCampi(this.options.tipo);
  }

  privatoChecked() {
    if(this.campi.risarcimento)
    {
      this.campi.risarcimento = "";
    }
  }


  altroChecked() {
    if(this.campi.soggetto_privato)
    {
      this.campi.soggetto_privato = "";
    }
  }

}
