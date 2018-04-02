import { Component, Output, EventEmitter } from '@angular/core';
import { Globals } from '../../shared/globals';

/**
 * Generated class for the SidebarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'sidebar',
  templateUrl: 'sidebar.html'
})
export class SidebarComponent {

  @Output() onNavigate: EventEmitter<any> = new EventEmitter();
  @Output() doLogout: EventEmitter<any> = new EventEmitter();

  sidebarItems = [
    {icon: 'pratiche', title: 'pratiche', notification: 0},
    {icon: 'tempario', title: 'tempario'},
    {icon: 'noleggio', title: 'noleggio'}
  ];

  constructor(public globals: Globals) {
    console.log('Hello SidebarComponent Component');
  }

  /**
   * Select sidebar menu item
   * @param item 
   */
  onSelectItem(item: string): void {
    if (this.globals.activeSideMenuItem !== item) {
      this.globals.activeSideMenuItem = item;
      this.onNavigate.emit(this.globals.activeSideMenuItem);      
    }
  }

  /**
   * Clicked logout button event
   */
  logout(): void {
    this.doLogout.emit();
  }

}
