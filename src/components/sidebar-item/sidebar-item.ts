import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Generated class for the SidebarItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'sidebar-item',
  templateUrl: 'sidebar-item.html'
})
export class SidebarItemComponent {

  @Input() name: string;
  @Input() icon: string;
  @Input() notifications: number;
  @Output() onSelectItem: EventEmitter<any> = new EventEmitter();

  constructor() {
    console.log('Hello SidebarItemComponent Component');    
  }

  /**
   * Handle clicked on item
   */
  handleClick(): void{
    this.onSelectItem.emit(this.name);
  }

}
