import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Globals } from '../../../../../shared/globals';
import { Options, CompleteList } from '../../../../../models/general';

@Component({
  selector: 'controparte-tab',
  templateUrl: 'controparte-tab.html'
})
export class ControparteTabComponent {
  @Output() onNextTab: EventEmitter<any> = new EventEmitter();

  @Output() onBackTab: EventEmitter<any> = new EventEmitter();

  @Input() pratica: any;

  @Input('options')
  get options(): Options {
  	return this.innerOptionsValue;
  }
  set options(v: Options) {
  	if (v !== this.innerOptionsValue) {
  		this.innerOptionsValue = v;
  		this.tipologiaVeicoloList = this.globals.parseArrayToSelectList(v.TipologieVeicolo) || [];  	  		
  	}
  }
  private innerOptionsValue: Options;

  tipologiaVeicoloList: Array<CompleteList> = [];

  constructor(public globals: Globals) {
    
  }
}