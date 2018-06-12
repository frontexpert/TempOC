import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { GeneralProvider } from '../../../../providers/general';
import { PracticesProvider } from '../../../../providers/practices';
import { Globals } from '../../../../shared/globals';
import * as Constants from '../../../../shared/constants';

import { Options } from '../../../../models/general';


@IonicPage()
@Component({
  selector: 'page-practice-edit',
  templateUrl: 'practice-edit.html',
})
export class PracticeEditPage {

  pID: number;      // id of pratica

  tabValues = Constants.APERTE_TAB_VALUES;

  selectedTab: number = 0;
  checkedTabs = [];

  public pratica: any = {};  // pratica body data

  public options: Options = new Options();  // Pratica Options

  constructor(public navCtrl: NavController, 
              private navParams: NavParams, 
              public globals: Globals, 
              private practicaProvider: PracticesProvider, 
              private generalProvider: GeneralProvider) {

    // check the first tab when created this modal
    this.checkedTabs.push(this.selectedTab);

    this.pID = this.navParams.get('ID');
    this.globals.praticaTipoID = this.navParams.get('TipoID');

    switch (this.globals.praticaTipoID) {
      case Constants.CREATION_CASE.RIPARAZIONE_MANUTENZIONE_CHECKUP:
        this.tabValues = Constants.APERTE_FIRST_VALUES;
        break;
      case Constants.CREATION_CASE.RIMBORSO_ASSICURATIVO_RCA:
        this.tabValues = Constants.APERTE_TAB_VALUES
        break;
      default:
        this.tabValues = Constants.APERTE_SECOND_VALUES;
        break;
    }

    this.initOptions();

  }

  ngOnInit() {
    console.log('ngOnInit');
    // show loading spinner
    this.globals.showLoading();
    // get pratica edit details
    this.practicaProvider.getEditDetails(this.pID).then((res: any) => {
      console.log("Success in get pratica edit");
      this.pratica = res;
      // hide loading spinner
      this.globals.hideLoading();
    })
    .catch(err => {        
      console.log("GET PRATICA EDIT ERROR: ",err);
      // hide loading spinner
      this.globals.hideLoading();
    });
  }

  handleNextSelection(): void {    
    console.log("this.selectedTab");
    console.log(this.selectedTab);
    if(this.checkedTabs.indexOf(this.selectedTab) === -1){
      this.checkedTabs.push(this.selectedTab);
    }

    if (this.selectedTab < this.tabValues.length - 1) {
      this.selectedTab++;
    }    
    else {
      // save to insert pratica
      // this.pratica.TipoID = this.globals.praticaTipoID; // set TipoID
      
      this.globals.showLoading().then(() => {
        this.practicaProvider.update(this.pratica).then(res => {
          this.globals.hideLoading();
          console.log("Update Pratica response: ", res);
          this.globals.showToastSuccess('Success updated Pratica.');
        })
        .catch(err => {
          this.globals.hideLoading();
          console.log("Update Pratica errors: ", err);
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
