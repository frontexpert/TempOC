import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'veicolo-tab',
  templateUrl: 'veicolo-tab.html'
})
export class VeicoloTabComponet {
  @Output() onNextTab: EventEmitter<any> = new EventEmitter();

  constructor() {
    
  }
}