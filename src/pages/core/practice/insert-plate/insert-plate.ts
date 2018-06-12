import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { InsertPracticePage } from '../insert-practice/insert-practice';
import { NgForm } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-insert-plate',
  templateUrl: 'insert-plate.html',
})
export class InsertPlatePage {

  license_plate: string = "";

  constructor(public navCtrl: NavController) {
  }

  nextPage(form: NgForm) {
    console.log(form);

    this.navCtrl.push(InsertPracticePage);
  }

}