import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { CorePage } from '../core/core';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  login = {
    username: '',
    password: ''
  };

  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  goToRegistrationPage(): void {

  }

  doLogin(form: NgForm): void {
    this.navCtrl.setRoot(CorePage);
  }

}
