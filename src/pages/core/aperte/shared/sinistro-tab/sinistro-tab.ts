import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sinistro-tab',
  templateUrl: 'sinistro-tab.html'
})
export class SinistroTabComponet {
  @Output() onNextTab: EventEmitter<any> = new EventEmitter();
  @Output() onBackTab: EventEmitter<any> = new EventEmitter();

  constructor() {
    
  }
}