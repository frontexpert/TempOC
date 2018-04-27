import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import * as Constants from '../../../shared/constants';
import { PracticesProvider } from '../../../providers/practices/practices';
import { Globals } from '../../../shared/globals';

/**
 * Generated class for the PratichePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chiuse',
  templateUrl: 'chiuse.html',
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChiusePage {

  searchTerm: string = '';

  activeItemID: number;         // active item ID

  praticeDetails: any; // selected a pratica item
  paymentDetails: any; // payment deteails for selected pratica item
  photoDetails: any;    // photo data for selected pratica item

  tabValues = Constants.PRATICHE_TAB_VALUES;

  checkedTabs: Array<number> = [];

  selectedTab: number = 0;

  minListIndex: number = 0;
  maxListIndex: number = 50;
  page: number = 0;

  //praticaList: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private _practice: PracticesProvider, 
              public globals: Globals, private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    console.log('ngOnInit');
    if (this.globals.praticaList.length == 0) {
      // show loading spinner
      this.globals.showLoading();
      // load list 
      this._practice.get(this.page).then((res: any) => {
        console.log("Success in this._practice.get()");
        this.globals.praticaList = res;
        // hide loading spinner
        this.globals.hideLoading();
      })
      .catch(err => {
        console.log("Success in this._practice.get()");
        console.log(err);
        // hide loading spinner
        this.globals.hideLoading();
      });
    }
  }

  // ngAfterViewInit() {
  //   this.cdr.detach();
  // }

  /**
   * On select a pratice item
   * @param item selected item
   */
  selectPraticeItem(item: any): void {   
    if (this.activeItemID != item.ID) {
      this.activeItemID = item.ID;    

      // change selected tab to first one
      //this.selectedTab = 0;

      // get pratica details and payment details
      this.globals.showLoading().then(() => {

        Promise.all([this._practice.getDetails(item.ID), this._practice.getPaymentDetails(item.ID), this._practice.getPraticeImageList(item.ID)])
          .then((values: any[]) => {
            this.praticeDetails = values[0]; // set pratice details
            this.paymentDetails = values[1];
            this.photoDetails = values[2];
            console.log('this.praticeDetails:');
            console.log(this.praticeDetails);
            console.log('this.paymentDetails:');
            console.log(this.paymentDetails);
            console.log('this.photoDetails:');
            console.log(this.photoDetails);
            this.globals.hideLoading();
          })
          .catch(err => {
            console.log('Get details ERROR:', err);
            this.globals.hideLoading();
          });
  
        // set mark for sub-tabs
        if (item.ImmaginiCount > 0) {
          this.checkedTabs.push(2); // photo marked
        }
  
        if (item.DocumentiCount > 0) {
          this.checkedTabs.push(3); // documenti marked
        }
  
        if (item.PreventiviCount > 0) {
          this.checkedTabs.push(4); // preventivi marked
        }
  
        if (item.NoleggiCount > 0) {
          this.checkedTabs.push(5); // Noleggi marked
        }
      });
    }
  }

  doInfinite(mode): Promise<any> {
    console.log('Begin async operation: ' + mode);

    return new Promise((resolve) => {
      this.page ++;
      this._practice.get(this.page).then((res: any) => {
        this.globals.praticaList = this.globals.praticaList.concat(res);
        //this.globals.praticaList = res;
        console.log('this.globals.praticaList');
        console.log(this.globals.praticaList);
        resolve();
      })
      .catch(err => {
        this.page --;
        resolve();
        console.log(err);
      });
    });
  }

}
