import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Globals } from '../../../../../shared/globals';
import { Options, CompleteList } from '../../../../../models/general';

@Component({
  selector: 'veicolo-tab',
  templateUrl: 'veicolo-tab.html'
})
export class VeicoloTabComponent {

  @Output() onNextTab: EventEmitter<any> = new EventEmitter();

  @Input() pratica: any;

  @Input('options')
  get options(): Options {
  	return this.innerOptionsValue;
  }
  set options(v: Options) {
  	if (v !== this.innerOptionsValue) {
  		this.innerOptionsValue = v;
  		this.tipologieVeicoloList = this.globals.parseArrayToSelectList(v.TipologieVeicolo);  		
  	}
  }

  private innerOptionsValue: Options;

  tipologieVeicoloList: CompleteList[] = [];		// TipologieVeicolo from options  

  constructor(public globals: Globals) {
    
  }

  ngOnInit() {
    console.log("ViewDidLoad");
  }

}