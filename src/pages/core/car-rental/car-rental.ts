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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarRentalPage');
  }

  editCarRental() {
  	this.navCtrl.push(CarRentalEditPage);
  }

}
