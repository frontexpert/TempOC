import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { GeneralProvider } from '../../../../providers/general';
import { PracticesProvider } from '../../../../providers/practices';
import { Globals } from '../../../../shared/globals';
import * as Constants from '../../../../shared/constants';

import { Options } from '../../../../models/general';

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

  isFirstCase: boolean;    // TipoID value for Pratica Insert: 100

  isSecondCase: boolean;   // RIMBORSO ASSICURATIVO DANNI DIVERSI

  isAllTabsAvailable: boolean;

  public pratica: any = {};  // pratica body data

  public options: Options = new Options();  // Pratica Options

  constructor(public navCtrl: NavController, public globals: Globals, private practicaProvider: PracticesProvider, private generalProvider: GeneralProvider) {
    // check the first tab when created this modal
    this.checkedTabs.push(this.selectedTab);

    switch (this.globals.praticaTipoID) {
      case Constants.CREATION_CASE.RIPARAZIONE_MANUTENZIONE_CHECKUP:
        this.tabValues = Constants.APERTE_FIRST_VALUES;
        this.isFirstCase = true;
        break;
      case Constants.CREATION_CASE.RIMBORSO_ASSICURATIVO_RCA:
        this.tabValues = Constants.APERTE_TAB_VALUES
        this.isAllTabsAvailable = true;
        break;
      default:
        this.tabValues = Constants.APERTE_SECOND_VALUES;
        this.isSecondCase = true;
        break;
    }

    this.initOptions();

  }

  handleNextSelection(): void {    
    if(this.checkedTabs.indexOf(this.selectedTab) === -1){
      this.checkedTabs.push(this.selectedTab);
    }

    if (this.selectedTab < this.tabValues.length - 1) {
      this.selectedTab++;
    }    
    else {
      // save to insert pratica
      this.pratica.TipoID = this.globals.praticaTipoID; // set TipoID
      
      this.globals.showLoading().then(() => {
        this.practicaProvider.post(this.pratica).then(res => {
          this.globals.hideLoading();
          console.log("Insert Pratica response: ", res);
          this.globals.showToastSuccess('Success saved Pratica.');
        })
        .catch(err => {
          this.globals.hideLoading();
          console.log("Insert Pratica errors: ", err);
          this.globals.showToastError('Something went wrong.');
        });
      });      
    }
    console.log(this.selectedTab);
    console.log("Pratica values is:", this.pratica);
  }

  /**
   * On clicked back button event to select previous tab
   */
  public handleBackSelection(): void {    
    if (this.selectedTab > 0) {
      this.selectedTab = this.selectedTab - 1;
    }    
    console.log("Active tab", this.selectedTab);    
  }

  /**
   * GetOptions via API call
   */
  private initOptions(): void {
    this.generalProvider.getOptions(this.globals.praticaTipoID)
      .then((opt: Options) => {
        this.options = opt;
      })
      .catch(err => console.log('ERROR: ', err));
  }

}
