import { Component, Output, EventEmitter } from '@angular/core';
import { Globals } from '../../../../../shared/globals';


@Component({
  selector: 'rientro-tab',
  templateUrl: 'rientro-tab.html'
})
export class RientroTabComponent {
  @Output() onNextTab: EventEmitter<any> = new EventEmitter();
  @Output() onBackTab: EventEmitter<any> = new EventEmitter();

  rate: number = 4;

  constructor(public globals: Globals) {
    
  }

  checkEmpty(input) {
    if(input.value == '')
    {
      input.value = '0';
    }
  }
}