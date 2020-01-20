import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { InsertPlatePage } from '../insert-plate/insert-plate';
import { Globals } from '../../../../shared/globals';
import { GeneralProvider } from '../../../../providers/general';

import * as Constants from '../../../../shared/constants';


@IonicPage()
@Component({
  selector: 'page-new-practice',
  templateUrl: 'new-practice.html',
})
export class NewPracticePage {

  CONSTANTS = Constants;

  constructor(public navCtrl: NavController, private general: GeneralProvider, public globals: Globals) {

  }

  ionViewDidLoad() {
    this.fetchCoutryAndCityInBackground();
  }

  nextPage(tipoID: number) {    
    console.log('NewPracticePage. tipoID: ', tipoID);
    // set tipoID to global service
    this.globals.praticaTipoID = tipoID;
    this.navCtrl.push(InsertPlatePage);
  }

  /**
   * Get the Country and City from api
   */
  private fetchCoutryAndCityInBackground(): void {
    Promise.all([this.general.getCountry(), this.general.getComune()])
      .then((values: any[]) => {
        if(values.length == 2) {
          //I've populated the two arrays
          //this.globals.countryList = values[0];
          //this.globals.comuniList = values[1];
        }
      })
      .catch(err => console.log('NewPracticePage. getCountry -> ERROR: ', err));
  }

}