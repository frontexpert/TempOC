import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InsertApertePage } from '../insert/insert-aperte';
import { NgForm } from '@angular/forms';

/**
 * Generated class for the PratichePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-targa',
  templateUrl: 'targa.html',
})
export class TargaPage {


  constructor(public navCtrl: NavController) {
  }

  nextPage(form: NgForm) {
    console.log(form);
    
    this.navCtrl.push(InsertApertePage);
  }

}