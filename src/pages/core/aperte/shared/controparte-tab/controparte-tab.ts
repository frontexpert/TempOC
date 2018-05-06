import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'controparte-tab',
  templateUrl: 'controparte-tab.html'
})
export class ControparteTabComponent {
  @Output() onNextTab: EventEmitter<any> = new EventEmitter();
  @Output() onBackTab: EventEmitter<any> = new EventEmitter();
  @Input() pratica: any;

  constructor() {
    
  }
}