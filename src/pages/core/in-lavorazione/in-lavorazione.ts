import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-in-lavorazione',
  templateUrl: 'in-lavorazione.html',
})
export class InLavorazionePage {

	constructor(public navCtrl: NavController, public navParams: NavParams) {

	}

	ionViewDidLoad() {
    console.log('ionViewDidLoad InLavorazionePage');
  }

}