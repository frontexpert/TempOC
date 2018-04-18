import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cliente-tab',
  templateUrl: 'cliente-tab.html'
})
export class ClienteTabComponet {
  @Output() onNextTab: EventEmitter<any> = new EventEmitter();
  @Output() onBackTab: EventEmitter<any> = new EventEmitter();

  constructor() {
    
  }
}