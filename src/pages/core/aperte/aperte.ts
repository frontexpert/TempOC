import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { TargaPage } from './targa/targa';
import { Globals } from '../../../shared/globals';

import * as Constants from '../../../shared/constants';


@IonicPage()
@Component({
  selector: 'page-aperte',
  templateUrl: 'aperte.html',
})
export class ApertePage {

  CONSTANTS = Constants;

  constructor(public navCtrl: NavController, public globalse: Globals) {    
  }

  ionViewDidLoad() {
  }

  nextPage(tipoID: number) {    
    console.log('tipoID', tipoID);
    // set tipo id to global service
    this.globalse.praticaTipoID = tipoID;
    this.navCtrl.push(TargaPage);
  }

}