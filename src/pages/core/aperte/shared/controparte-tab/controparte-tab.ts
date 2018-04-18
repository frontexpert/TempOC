import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'controparte-tab',
  templateUrl: 'controparte-tab.html'
})
export class ControparteTabComponet {
  @Output() onNextTab: EventEmitter<any> = new EventEmitter();
  @Output() onBackTab: EventEmitter<any> = new EventEmitter();

  constructor() {
    
  }
}