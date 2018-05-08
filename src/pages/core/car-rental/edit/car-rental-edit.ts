import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import * as Constants from '../../../../shared/constants';


@Component({
  selector: 'page-car-rental-edit',
  templateUrl: 'car-rental-edit.html',
})
export class CarRentalEditPage {

	tabValues = Constants.NOLEGGIO_TAB_VALUES;

  selectedTab: number = 0;
  checkedTabs = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	// check the first tab when created this modal
    this.checkedTabs.push(this.selectedTab);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarRentalEditPage');
  }

  handleSelectTab(val): void {
    const value = val.value || val;
    this.selectedTab = value;
    console.log(this.selectedTab)
    if(this.checkedTabs.indexOf(value) === -1){
      this.checkedTabs.push(value);
    }
  }

  /**
   * On clicked back button event to select previous tab
   */
  public handleBackSelect(): void {    
    if (this.selectedTab > 0) {
      this.selectedTab = this.selectedTab - 1;
    }    
    console.log("Active tab", this.selectedTab);    
  }

}
