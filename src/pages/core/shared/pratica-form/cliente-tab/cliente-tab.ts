import { Component, Input, Output, EventEmitter } from '@angular/core';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

import { GeneralProvider } from '../../../../../providers/general';
import { Globals } from '../../../../../shared/globals';
import { CompleteListItem } from '../../../../../models/general';


@Component({
  selector: 'cliente-tab',
  templateUrl: 'cliente-tab.html'
})
export class ClienteTabComponent {

  @Output() onNextTab: EventEmitter<any> = new EventEmitter();

  @Output() onBackTab: EventEmitter<any> = new EventEmitter();

  @Input() pratica: any;

  // Properties
  countries: CompleteListItem[] = [];
  cities: CompleteListItem[] = [];

  constructor(private general: GeneralProvider, private globals: Globals) {
    this.initDropdownList();
  }

  /**
   * Initialize Dropdown list
   */
  initDropdownList(): void {
  	Promise.all([this.general.getCountry(), this.general.getComune()])
  		.then((values: any[]) => {
  			this.countries = this.globals.parseCountryToAutocompleteList(values[0]);
  			this.cities = this.globals.parseCityToAutocompleteList(values[1]);
  		})
  		.catch(err => console.log('ERROR: ', err));
  }

  /**
   * ngbTypeahead search for county
   */
  searchCounty = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.countries.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1))
    );

  typeahead_formatter = (x: {name: string}) => x.name;

  /**
   * On select country item
   * @param item 
   */
  onSelectCountyOfBirth(item: CompleteListItem) {
  	this.pratica.P1_LuogoNascitaNazione = item.name;
  }

  /**
   * On select country item
   * @param item 
   */
  onSelectCounty(item) {
  	this.pratica.P1_ResidenzaNazione = item.name;
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
  onSelectCityOfBirth(item) {
    this.pratica.P1_LuogoNascita = item.name;
  }
  
  /**
   * On select city item
   * @param item 
   */
  onSelectCity(item) {
  	this.pratica.P1_ResidenzaComune = item.name;
  }
}