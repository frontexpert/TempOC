import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import * as Constants from '../../../../shared/constants';

/**
 * Generated class for the PratichePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-insert-aperte',
  templateUrl: 'insert-aperte.html',
})
export class InsertApertePage {

  tabValues = Constants.APERTE_TAB_VALUES;

  selectedTab: number = 0;
  checkedTabs = [];

  constructor(public navCtrl: NavController) {
    // check the first tab when created this modal
    this.checkedTabs.push(this.selectedTab);
  }

  handleSelectTab(val): void {
    const value = val.value || val;
    this.selectedTab = value;
    console.log(this.selectedTab)
    if(this.checkedTabs.indexOf(value) === -1){
      this.checkedTabs.push(value);
    }
  }

}