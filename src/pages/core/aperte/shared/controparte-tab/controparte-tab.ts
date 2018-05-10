import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Globals } from '../../../../../shared/globals';

@Component({
  selector: 'controparte-tab',
  templateUrl: 'controparte-tab.html'
})
export class ControparteTabComponent {
  @Output() onNextTab: EventEmitter<any> = new EventEmitter();
  
  @Output() onBackTab: EventEmitter<any> = new EventEmitter();

  @Input() pratica: any;

  @Input('options')
  get options(): any {
  	return this.innerOptionsValue;
  }
  set options(v: any) {
  	if (v !== this.innerOptionsValue) {
  		this.innerOptionsValue = v;
  		this.tipologiaVeicoloList = this.globals.parseArrayToSelectList(v.TipologieVeicolo) || [];  	  		
  	}
  }
  private innerOptionsValue: any;

  tipologiaVeicoloList: Array<any> = [];

  constructor(public globals: Globals) {
    
  }
}