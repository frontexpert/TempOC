import { Component, Output, EventEmitter } from '@angular/core';
import { Globals } from '../../../../../shared/globals';


@Component({
  selector: 'dettaglio-tab',
  templateUrl: 'dettaglio-tab.html'
})
export class DettaglioTabComponent {
  @Output() onNextTab: EventEmitter<any> = new EventEmitter();
  @Output() onBackTab: EventEmitter<any> = new EventEmitter();

  rate: number = 4;

  constructor(public globals: Globals) {
    
  }
}