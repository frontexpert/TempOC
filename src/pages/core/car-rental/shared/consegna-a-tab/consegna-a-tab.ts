import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'consegna-a-tab',
  templateUrl: 'consegna-a-tab.html'
})
export class ConsegnaATabComponent {
  @Output() onNextTab: EventEmitter<any> = new EventEmitter();
  @Output() onBackTab: EventEmitter<any> = new EventEmitter();

  constructor() {
    
  }
}