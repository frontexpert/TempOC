import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CarRentalEditPage } from './edit/car-rental-edit';


/**
 * Generated class for the RentalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-car-rental',
  templateUrl: 'car-rental.html',
})
export class CarRentalPage {
  items: any = [];
  _isCleared: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.items = [
      {expanded: false},
      {expanded: false},
      {expanded: false},
      {expanded: false},
      {expanded: false},
      {expanded: false},
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarRentalPage');
  }

  editCarRental() {
  	this.navCtrl.push(CarRentalEditPage);
  }

  expandItem(item){

    if (!item.expanded && this._isCleared) {      
      this._isCleared = false;
      return;
    }
 
    this.items.map((listItem) => {      

      if(item == listItem){
          listItem.expanded = !listItem.expanded;
      } else {
          listItem.expanded = false;
      }

      return listItem;

    });

  }

  clearItem() {
    this._isCleared = true;

    this.items.map((listItem) => {
      listItem.expanded = false;

      return listItem;
    });
  }

}
