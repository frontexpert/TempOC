import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'stato-veicolo-tab',
  templateUrl: 'stato-veicolo-tab.html'
})
export class StatoVeicoloTabComponent {
  @Output() onNextTab: EventEmitter<any> = new EventEmitter();
  @Output() onBackTab: EventEmitter<any> = new EventEmitter();

  constructor() {
    
  }
}