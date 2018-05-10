import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Globals } from '../../../../../shared/globals';

@Component({
  selector: 'veicolo-tab',
  templateUrl: 'veicolo-tab.html'
})
export class VeicoloTabComponent {
	
  @Output() onNextTab: EventEmitter<any> = new EventEmitter();

  @Input() pratica: any;

  @Input('options')
  get options(): any {
  	return this.innerOptionsValue;
  }
  set options(v: any) {
  	if (v !== this.innerOptionsValue) {
  		this.innerOptionsValue = v;
  		this.tipologieVeicoloList = this.globals.parseArrayToSelectList(v.TipologieVeicolo);  		
  	}
  }

  private innerOptionsValue: any;

  tipologieVeicoloList: any[] = [];		// TipologieVeicolo from options  

  constructor(public globals: Globals) {
    
  }

  ngOnInit() {
    console.log("ViewDidLoad");
  }

}