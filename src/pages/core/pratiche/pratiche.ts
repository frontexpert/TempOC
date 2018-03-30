import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PratichePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pratiche',
  templateUrl: 'pratiche.html',
})
export class PratichePage {

  searchTerm: string = "";

  activeItem: string;

  data = [
    {name: 'Glenn Lambert', type:'electricity', number: '170651', date: '2017-11-11'},
    {name: 'Earl Guerrero', type:'electricity', number: '170345', date: '2017-10-27'},
    {name: 'Glen Andrews', type:'electricity', number: '73635', date: '2017-01-11'},
    {name: 'Ann Briggs', type:'electricity', number: '39783-2602', date: '2017-10-01'},
    {name: 'Stella Hudson', type:'electricity', number: '71250-4469', date: '2017-10-11'},
    {name: 'Cole Moore', type:'electricity', number: '03298-8402', date: '2017-03-11'},
    {name: 'Brent Clayton', type:'electricity', number: '95673-7966', date: '2017-05-14'},
    {name: 'Essie Swanson', type:'electricity', number: '60338', date: '2017-02-27'},
    {name: 'Edith Graves', type:'electricity', number: '37087-0100', date: '2017-11-21'},
    {name: 'Mabelle Thompson', type:'electricity', number: '41319', date: '2017-08-16'},
    {name: 'Don Smith', type:'electricity', number: '42582', date: '2017-11-11'},
    {name: 'Myrtie Roberson', type:'electricity', number: '00757-1568', date: '2017-11-14'},
    {name: 'Mabelle Thompson', type:'electricity', number: '41319', date: '2017-08-16'},
    {name: 'Don Smith', type:'electricity', number: '42582', date: '2017-11-11'},
    {name: 'Myrtie Roberson', type:'electricity', number: '00757-1568', date: '2017-11-14'},
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PratichePage');
  }

  /**
   * On select a pratice item
   * @param name item name
   */
  selectPraticeItem(name: string): void {
    this.activeItem = name;    
  }

}
