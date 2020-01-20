import { Component, Input, Output, EventEmitter } from '@angular/core';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

import { GeneralProvider } from '../../../../../providers/general';
import { Globals } from '../../../../../shared/globals';
import { Options, CompleteListItem, Comune } from '../../../../../models/general';
import * as CONSTANTS from '../../../../../shared/constants';

@Component({
  selector: 'sinistro-tab',
  templateUrl: 'sinistro-tab.html'
})
export class SinistroTabComponent {

  @Output() onNextTab: EventEmitter<any> = new EventEmitter();

  @Output() onBackTab: EventEmitter<any> = new EventEmitter();

  @Input() pratica: any;

  @Input('options')
  get options(): Options {
  	return this.innerOptionsValue;
  }
  set options(v: Options) {
  	if (v !== this.innerOptionsValue) {
  		this.innerOptionsValue = v;
  		this.entitaCostiList = this.globals.parseArrayToSelectList(v.EntitaCosti) || [];  	
  		this.circostanzeList = this.globals.parseCircostanzeToSelectList(v.Circostanze) || [];
  	}
  }
  private innerOptionsValue: Options;

  entitaCostiList: Array<CompleteListItem> = [];
  circostanzeList: Array<CompleteListItem> = [];

  cities: Array<CompleteListItem> = [];

  responsibility: string = ""; 	// Display Presunta	Responsabilità

  constructor(public globals: Globals, private general: GeneralProvider) {
    this.initDropdownList();
  }

  /**
   * Initialize Dropdown list
   */
  initDropdownList(): void {
  	this.general.getComune()
  		.then((res: Array<Comune>) => {  			
  			this.cities = this.globals.parseCityToAutocompleteList(res);
  		})
  		.catch(err => console.log('SinistroTab. getComune -> ERROR: ', err));
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

  typeahead_formatter = (x: {name: string}) => x.name;

  /**
   * On select city item
   * @param item 
   */
  onSelectCity(item) {
  	this.pratica.SinistroComune = item.name;
  }

  /**
   * On change "CIRCOSTANZE VEICOLO CLIENTE" and "CIRCOSTANZE VEICOLO CONTROPARTE" selection
   */
  onChangeResponsibility() {
  	if (this.pratica.SinistroP1CircostanzaID && this.pratica.SinistroP2CircostanzaID)
  		this.responsibility = CONSTANTS.PRESENT_RESPONSIBILITY[CONSTANTS.BAREME[this.pratica.SinistroP1CircostanzaID - 1][this.pratica.SinistroP2CircostanzaID - 1]];
  }
}