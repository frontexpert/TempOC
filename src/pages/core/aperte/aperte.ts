import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { TargaPage } from './targa/targa';

/**
 * Generated class for the PratichePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aperte',
  templateUrl: 'aperte.html',
})
export class ApertePage {

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    // this.navCtrl.push(InsertApertePage);
  }

  nextPage() {
    this.navCtrl.push(TargaPage);
  }

}