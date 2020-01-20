import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { IonicPage, NavController, Events, ViewController, NavParams } from 'ionic-angular';
import { GeneralProvider } from '../../../../providers/general';
import { Globals } from '../../../../shared/globals';
import { CompleteListItem, VeicoloOptions, Common } from '../../../../models/general';
//import { Component, Input, Output, EventEmitter } from '@angular/core';

//import { Globals } from '../../../../../shared/globals';
//import { Options, CompleteListItem } from '../../../../../models/general';

/**
 * Generated class for the QuoteOptionsModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quote-options-modal-old',
  templateUrl: 'quote-options-modal-old.html',
})
export class QuoteOptionsModalOldPage {
 
  title: string;
  marcaId: number = 0;
  modelloId: number = 0;
  versioneId: number = 0;

  is_changed: boolean = false;

  campi: any = {
    marcaId: 0,
    modelloId: 0,
    versioneId: 0
  }

  errore: any = {
    marca: '',
    modello: '',
    versione: ''
  };

  marcaVeicoloList: CompleteListItem[] = [];		// lista marche veicoli
  modelloVeicoloList: CompleteListItem[] = [];		// lista modelli veicoli 
  versioneVeicoloList: CompleteListItem[] = [];		// lista versioni veicoli

  /*get joptions(): VeicoloOptions {
    
  	return this.innerOptionsValue;
  }
  set joptions(v: VeicoloOptions) {
  	
  		this.innerOptionsValue = v;
      this.marcaVeicoloList = this.globals.parseArrayToSelectList(v.Marche) || [];
      this.modelloVeicoloList = this.globals.parseArrayToSelectList(v.Modelli) || []; 
      this.versioneVeicoloList = this.globals.parseArrayToSelectList(v.Versioni) || []; 
      console.log(this.innerOptionsValue); 	  		
  	
  }*/

  private innerOptionsValue: VeicoloOptions;

  constructor(public vc: ViewController, 
              public navParams: NavParams,
              private generalProvider: GeneralProvider,
              public globals: Globals) {
  }

  ngOnInit() {
    this.title = this.navParams.get('title');
    this.marcaId = this.navParams.get('marcaId');
    this.modelloId = this.navParams.get('modelloId');
    this.versioneId = this.navParams.get('versioneId');

    if(this.marcaId != null && this.marcaId != 0 && this.modelloId != null && this.modelloId != 0)
    {
      this.globals.showLoading().then(() => {

        let promises = [
          this.generalProvider.getMarca(), 
          this.generalProvider.getModello(this.marcaId, 1), 
          this.generalProvider.getVersione(this.modelloId)
        ];
  
  
        Promise.all(promises).then((values: any[]) => {   
                
          this.marcaVeicoloList = this.globals.parseArrayToSelectList(values[0]) || []; // set pratice details
          console.log(this.marcaVeicoloList, 'marcaVeicoloList');
          
          this.modelloVeicoloList = this.globals.parseArrayToSelectList(values[1]) || [];
          console.log(this.modelloVeicoloList, 'modelloVeicoloList');
  
          this.versioneVeicoloList = this.globals.parseArrayToSelectList(values[2]) || [];
          console.log(this.versioneVeicoloList, 'versioneVeicoloList');
          
          this.globals.hideLoading();
  
        })
        .catch(err => {
          console.log('Initialize list ERROR:', err);
          this.globals.hideLoading();
        });
  
      });
    } else {
      if(this.marcaId == null || this.marcaId == 0)
      {
        //La marca è zero, una sola promise
        this.generalProvider.getMarca().then(res => {
          let arr: any;
          arr = res;
          this.marcaVeicoloList = this.globals.parseArrayToSelectList(arr) || []; // set pratice details
        }).catch(err => {
          console.log(err);
          // hide loading spinner
          this.globals.hideLoading();
        });
        let modello_zero: CompleteListItem = {
          name: '--',
	        value: 0,
	        text: '--'
        }
        this.modelloVeicoloList.push(modello_zero);
        let versione_zero: CompleteListItem = {
          name: '--',
	        value: 0,
	        text: '--'
        }
        this.versioneVeicoloList.push(versione_zero);
        this.marcaId = 0;
        this.modelloId = 0;
        this.versioneId = 0;
      } else if(this.modelloId == null || this.modelloId == 0)
      {
        //Abbiamo un id marca, esplodiamo i modelli, le versioni restano a 0
        this.generalProvider.getModello(this.marcaId, 1).then(res => {
          let arr: any;
          arr = res;
          this.modelloVeicoloList = this.globals.parseArrayToSelectList(arr) || []; // set pratice details
        }).catch(err => {
          console.log(err);
          // hide loading spinner
          this.globals.hideLoading();
        });
        let versione_zero: CompleteListItem = {
          name: '--',
	        value: 0,
	        text: '--'
        }
        this.versioneVeicoloList.push(versione_zero);
        this.marcaId = 0;
        this.versioneId = 0;
      } else {
        //abbiamo id marca e id modello, esplodiamo le versioni
        this.generalProvider.getVersione(this.modelloId).then(res => {
          let arr: any;
          arr = res;
          this.versioneVeicoloList = this.globals.parseArrayToSelectList(arr) || []; // set pratice details
        }).catch(err => {
          console.log(err);
          // hide loading spinner
          this.globals.hideLoading();
        });
      }
      this.versioneId = 0;
    }

  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuoteOptionsModalPage');

    // this.signaturePad is now available
    window.onresize = this.resizeCanvas.bind(this);
    this.resizeCanvas();
    //this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }

  private resizeCanvas(): void {
    
  }

  dismiss() {
    this.campi = {
      marcaId: this.navParams.get('marcaId'),
      modelloId: this.navParams.get('modelloId'),
      versioneId: this.navParams.get('versioneId'),
      nuovo: this.navParams.get('nuovo')
    }
    this.is_changed = false;
    this.vc.dismiss({is_changed: this.is_changed, Campi : this.campi});
  }

  done() {

    this.campi = {
      marcaId: this.marcaId,
      modelloId: this.modelloId,
      versioneId: this.versioneId,
      nuovo: this.navParams.get('nuovo')
    }

    this.is_changed = true;
    this.vc.dismiss({is_changed: this.is_changed, Campi : this.campi});
    
  }

  clearSelection() {
    this.marcaId = 0;
    this.changeSelection('marca');
  }

  changeSelection(voce: string) {
    
    switch(voce)
    {
      case 'marca':
        this.modelloId = 0;
        this.versioneId = 0;

        let marca_promises = [  
          this.generalProvider.getModello(this.marcaId, 1),
          this.generalProvider.getVersione(this.modelloId)
        ];
        Promise.all(marca_promises).then((values: any[]) => {            
          
          this.modelloVeicoloList = this.globals.parseArrayToSelectList(values[0]) || [];
          console.log(this.modelloVeicoloList, 'modelloVeicoloList');
  
          this.versioneVeicoloList = this.globals.parseArrayToSelectList(values[1]) || [];
          console.log(this.versioneVeicoloList, 'versioneVeicoloList');
          
          this.globals.hideLoading();
  
        })
        .catch(err => {
          console.log('Initialize list ERROR:', err);
          this.globals.hideLoading();
        });

      break;
      case 'modello':
        this.versioneId = 0
        let modello_promises = [  
          this.generalProvider.getVersione(this.modelloId)
        ];
        Promise.all(modello_promises).then((values: any[]) => {            
         
          this.versioneVeicoloList = this.globals.parseArrayToSelectList(values[0]) || [];
          console.log(this.modelloVeicoloList, 'modelloVeicoloList');
          
          this.globals.hideLoading();

        })
      break;
    }
  }

}
