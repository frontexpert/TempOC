import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import * as Constants from '../../../shared/constants';
import { PracticesProvider } from '../../../providers/practices/practices';
/**
 * Generated class for the PratichePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-practices',
  templateUrl: 'practices.html',
})
export class PracticesPage {

  searchTerm: string = '';

  activeItemID: number;         // active item ID

  selectedItem: any; // selected a pratica item

  tabValues = Constants.PRATICHE_TAB_VALUES;

  checkedTabs: Array<number> = [];

  selectedTab: number = 0;

  data = [
    {name: 'Glenn Lambert', type:'electricity', number: '170651', date: '2017-11-11', color:'orange'},
    {name: 'Earl Guerrero', type:'electricity', number: '170345', date: '2017-10-27', color:'yello'},
    {name: 'Glen Andrews', type:'electricity', number: '73635', date: '2017-01-11', color:'green'},
    {name: 'Ann Briggs', type:'electricity', number: '39783-2602', date: '2017-10-01', color:'green'},
    {name: 'Stella Hudson', type:'electricity', number: '71250-4469', date: '2017-10-11', color:'green'},
    {name: 'Cole Moore', type:'electricity', number: '03298-8402', date: '2017-03-11', color:'green'},
    {name: 'Brent Clayton', type:'electricity', number: '95673-7966', date: '2017-05-14', color:'pink'},
    {name: 'Essie Swanson', type:'electricity', number: '60338', date: '2017-02-27', color:'pink'},
    {name: 'Edith Graves', type:'electricity', number: '37087-0100', date: '2017-11-21', color:'pink'},
    {name: 'Mabelle Thompson', type:'electricity', number: '41319', date: '2017-08-16', color:'pink'},
    {name: 'Don Smith', type:'electricity', number: '42582', date: '2017-11-11', color:'pink'},
    {name: 'Myrtie Roberson', type:'electricity', number: '00757-1568', date: '2017-11-14', color:'yello'},
    {name: 'Mabelle Thompson', type:'electricity', number: '41319', date: '2017-08-16', color:'yello'},
    {name: 'Don Smith', type:'electricity', number: '42582', date: '2017-11-11', color:'lightblue'},
    {name: 'Myrtie Roberson', type:'electricity', number: '00757-1568', date: '2017-11-14', color:'green'},
  ];

  praticaList: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _psp: PracticesProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PratichePage');

    // load list 
    this._psp.get().then((res: any) => {
      console.log(res);
      this.praticaList = res;
    })
    .catch(err => console.log(err));
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
