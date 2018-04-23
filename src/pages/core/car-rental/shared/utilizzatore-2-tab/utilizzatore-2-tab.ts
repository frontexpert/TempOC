import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'utilizzatore-2-tab',
  templateUrl: 'utilizzatore-2-tab.html'
})
export class Utilizzatore2TabComponent {
  @Output() onNextTab: EventEmitter<any> = new EventEmitter();
  @Output() onBackTab: EventEmitter<any> = new EventEmitter();

  constructor() {
    
  }
}