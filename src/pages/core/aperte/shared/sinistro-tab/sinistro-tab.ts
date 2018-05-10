import { Component, Input, Output, EventEmitter } from '@angular/core';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

import { GeneralProvider } from '../../../../../providers/general';
import { Globals } from '../../../../../shared/globals';

const Bareme =	[
	[0,	1,	3,	3,	3,	3,	3,	0,	3,	0,	3,	3,	0,	0,	3,	3,	1,	3],	//	00
	[3,	0,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3,	3],	//	01
	[1,	1,	2,	2,	2,	2,	3,	3,	2,	1,	1,	1,	1,	1,	3,	3,	1,	2],	//	02
	[1,	1,	2,	2,	2,	2,	1,	1,	3,	0,	0,	0,	1,	1,	3,	3,	0,	3],	//	03
	[1,	1,	2,	2,	2,	2,	1,	1,	2,	1,	1,	1,	1,	1,	2,	3,	1,	2],	//	04
	[1,	1,	2,	2,	2,	2,	1,	1,	3,	1,	0,	0,	1,	0,	3,	3,	1,	3],	//	05
	[1,	1,	1,	3,	3,	3,	2,	1,	3,	0,	3,	0,	3,	0,	3,	3,	1,	3],	//	06
	[0,	1,	1,	3,	3,	3,	3,	2,	3,	2,	3,	3,	3,	3,	3,	3,	1,	3],	//	07
	[1,	1,	2,	1,	2,	1,	1,	1,	0,	0,	2,	1,	1,	1,	3,	0,	1,	2],	//	08
	[0,	1,	3,	0,	3,	3,	0,	2,	0,	2,	3,	3,	3,	3,	3,	3,	0,	3],	//	09
	[1,	1,	3,	0,	3,	0,	1,	1,	2,	1,	2,	1,	1,	1,	2,	3,	1,	3],	//	10
	[1,	1,	3,	0,	3,	0,	0,	1,	3,	1,	3,	2,	1,	2,	3,	3,	1,	2],	//	11
	[0,	1,	3,	3,	3,	3,	1,	1,	3,	1,	3,	3,	2,	0,	3,	3,	1,	3],	//	12
	[0,	1,	3,	3,	3,	0,	0,	1,	3,	1,	3,	2,	0,	2,	3,	3,	1,	3],	//	13
	[1,	1,	1,	1,	2,	1,	1,	1,	1,	1,	2,	1,	1,	1,	2,	2,	1,	2],	//	14
	[1,	1,	1,	1,	1,	1,	1,	1,	0,	1,	1,	1,	1,	1,	2,	2,	1,	2],	//	15
	[3,	1,	3,	0,	3,	3,	3,	3,	3,	0,	3,	3,	3,	3,	3,	3,	2,	3],	//	16
	[1,	1,	2,	1,	2,	1,	1,	1,	2,	1,	1,	2,	1,	1,	2,	2,	1,	2]	//	17
];

@Component({
  selector: 'sinistro-tab',
  templateUrl: 'sinistro-tab.html'
})
export class SinistroTabComponent {
	
  @Output() onNextTab: EventEmitter<any> = new EventEmitter();

  @Output() onBackTab: EventEmitter<any> = new EventEmitter();

  @Input() pratica: any;

  @Input('options')
  get options(): any {
  	return this.innerOptionsValue;
  }
  set options(v: any) {
  	if (v !== this.innerOptionsValue) {
  		this.innerOptionsValue = v;
  		this.entitaCostiList = this.globals.parseArrayToSelectList(v.EntitaCosti) || [];  	
  		this.circostanzeList = this.globals.parseCircostanzeToSelectList(v.Circostanze) || [];
  	}
  }
  private innerOptionsValue: any;

  entitaCostiList: Array<any> = [];
  circostanzeList: Array<any> = [];

  cities: Array<any> = [];

  constructor(public globals: Globals, private general: GeneralProvider) {
    this.initDropdownList();
  }

  /**
   * Initialize Dropdown list
   */
  initDropdownList(): void {
  	this.general.getComune()
  		.then((res: any) => {  			
  			this.cities = this.globals.parseCityToAutocompleteList(res);
  		})
  		.catch(err => console.log('ERROR: ', err));
  }

  /**
   * ngbTypeahead search for county
   */
  searchCities = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.cities.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1))
    );

  /**
   * On select city item
   * @param item 
   */
  onSelectCity(item) {
  }
}