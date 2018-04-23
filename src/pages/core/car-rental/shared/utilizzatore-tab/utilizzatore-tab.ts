import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'utilizzatore-tab',
  templateUrl: 'utilizzatore-tab.html'
})
export class UtilizzatoreTabComponent {
  @Output() onNextTab: EventEmitter<any> = new EventEmitter();

  constructor() {
    
  }
}