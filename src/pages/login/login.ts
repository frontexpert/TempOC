import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { CorePage } from '../core/core';
import { PracticesProvider } from '../../providers/practices';
import { Globals } from '../../shared/globals';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  login = {
    username: '',
    password: ''
  };

  constructor(public navCtrl: NavController, private _practice: PracticesProvider, public globals: Globals) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  goToRegistrationPage(): void {

  }

  doLogin(form: NgForm): void {
    // load list 
    this._practice.getAllPratices().then((res: any) => {
      console.log("Success in getting all practices list");
      this.globals.praticaList = res;
      // hide loading spinner
    })
    .catch(err => {
      console.log("failed in getting all practices list");
      console.log(err);
      // hide loading spinner
    });
    this.navCtrl.setRoot(CorePage);
  }

}
