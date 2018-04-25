import { Component } from '@angular/core';
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
})
export class ChiusePage {

  searchTerm: string = '';

  activeItemID: number;         // active item ID

  activeItem: any; // selected a pratica item

  tabValues = Constants.PRATICHE_TAB_VALUES;

  checkedTabs: Array<number> = [];

  selectedTab: number = 0;

  //praticaList: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private _practice: PracticesProvider, 
              public globals: Globals) {
  }

  ngOnInit() {
    console.log('ngOnInit');
    if (this.globals.praticaList.length == 0) {
      // show loading spinner
      this.globals.showLoading();
      // load list 
      this._practice.get().then((res: any) => {
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

  /**
   * On select a pratice item
   * @param item selected item
   */
  selectPraticeItem(item: any): void {   
    if (this.activeItemID != item.ID) {
      this.activeItemID = item.ID;    

      this._practice.getDetails(item.ID)
        .then(res => {
          this.activeItem = res;
        })
        .catch(err => {
          console.log('ERROR :', err);
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
    }
  }

}
