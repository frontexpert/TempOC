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

  selectedItem: any; // selected a pratica item

  tabValues = Constants.PRATICHE_TAB_VALUES;

  checkedTabs: Array<number> = [];

  selectedTab: number = 0;

  //praticaList: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _practice: PracticesProvider, public globals: Globals) {
  }

  ngOnInit() {
    console.log('ngOnInit');
    if (this.globals.praticaList.length == 0) {
      // show loading spinner
      this.globals.presentLoadingSpinner();
      // load list 
      this._practice.get().then((res: any) => {
        console.log("Success in this._practice.get()");
        this.globals.praticaList = res;
        // hide loading spinner
        this.globals.dismissLoadingSpiner();
      })
      .catch(err => {
        console.log("Success in this._practice.get()");
        console.log(err);
        // hide loading spinner
        this.globals.dismissLoadingSpiner();
      });
    }
  }

  /**
   * On select a pratice item
   * @param item selected item
   */
  selectPraticeItem(item: any): void {
    this.selectedItem = item;
    this.activeItemID = item.ID;    

    if (this.selectedItem.ImmaginiCount > 0) {
      this.checkedTabs.push(2); // photo marked
    }

    if (this.selectedItem.DocumentiCount > 0) {
      this.checkedTabs.push(3); // documenti marked
    }

    if (this.selectedItem.PreventiviCount > 0) {
      this.checkedTabs.push(4); // preventivi marked
    }

    if (this.selectedItem.NoleggiCount > 0) {
      this.checkedTabs.push(5); // Noleggi marked
    }
  }

}
