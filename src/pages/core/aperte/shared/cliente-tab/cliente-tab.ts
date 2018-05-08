import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GeneralProvider } from '../../../../../providers/general';

@Component({
  selector: 'cliente-tab',
  templateUrl: 'cliente-tab.html'
})
export class ClienteTabComponent {
  @Output() onNextTab: EventEmitter<any> = new EventEmitter();
  @Output() onBackTab: EventEmitter<any> = new EventEmitter();
  @Input() pratica: any;

  // Properties
  countries: any[] = [];
  cities: any[] = [];

  constructor(private general: GeneralProvider) {
    this.initDropdownList();
  }

  /**
   * Initialize Dropdown list
   */
  initDropdownList(): void {
  	Promise.all([this.general.getCountry(), this.general.getComune()])
  		.then((values: any[]) => {
  			this.countries = values[0];
  			this.cities = values[1];
  		})
  		.catch(err => console.log('ERROR: ', err));
  }
}