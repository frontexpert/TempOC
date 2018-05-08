import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sinistro-tab',
  templateUrl: 'sinistro-tab.html'
})
export class SinistroTabComponent {
  @Output() onNextTab: EventEmitter<any> = new EventEmitter();
  @Output() onBackTab: EventEmitter<any> = new EventEmitter();
  @Input() pratica: any;
  @Input() options: any;

  constructor() {
    
  }
}