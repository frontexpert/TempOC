import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'veicolo-tab',
  templateUrl: 'veicolo-tab.html'
})
export class VeicoloTabComponent {
  @Output() onNextTab: EventEmitter<any> = new EventEmitter();
  @Input() pratica: any;
  @Input() options: any;

  constructor() {
    
  }
}