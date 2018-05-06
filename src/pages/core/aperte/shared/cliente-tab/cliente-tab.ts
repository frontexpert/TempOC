import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cliente-tab',
  templateUrl: 'cliente-tab.html'
})
export class ClienteTabComponent {
  @Output() onNextTab: EventEmitter<any> = new EventEmitter();
  @Output() onBackTab: EventEmitter<any> = new EventEmitter();
  @Input() pratica: any;

  constructor() {
    
  }
}