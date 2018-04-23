import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'dettaglio-tab',
  templateUrl: 'dettaglio-tab.html'
})
export class DettaglioTabComponent {
  @Output() onNextTab: EventEmitter<any> = new EventEmitter();
  @Output() onBackTab: EventEmitter<any> = new EventEmitter();

  rate: number = 4;

  constructor() {
    
  }
}