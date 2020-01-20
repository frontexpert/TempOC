import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { CorePage } from '../core/core';
import { PracticesProvider } from '../../providers/practices';
import { LoginProvider } from '../../providers/login';
import { Globals } from '../../shared/globals';
import { RecoverPage } from '../recover/recover';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  login = {
    username: '',
    password: ''
  };

  errore: string = '';

  constructor(public navCtrl: NavController, private _practice: PracticesProvider, private _login: LoginProvider, public globals: Globals, private alert: AlertController,) {
    
  }

  ionViewDidLoad() {
    console.log('LoginPage ionViewDidLoad');
  }

  /*logOn(username: string, password: string): void {
    console.log('USERNAME= ' + username);
    console.log('PASSWORD= ' + password);
  }*/

  doLogin(form: NgForm): void {
    //console.log('')
    this.globals.showLoading().then(() => {

    this._login.logOn(form.value.username, form.value.password).then((res: any) => {
      this.globals.hideLoading();
      if(res == "OK") {

          // load list 
          this._practice.getAllPratices().then((res: any) => {
            console.log("Success in getting all practices list");
            this.globals.praticaList = res;      
          })
          .catch(err => {
            console.log("LoginPage. Failed in getting all practices list");
            console.log(err);
          });

        this.navCtrl.setRoot(CorePage);
      } else {
        this.errore = "Credenziali non valide";
       
      }
    }).catch(err => {
      this.globals.showToastError('errore server in fase di autenticazione');
      console.log('LoginPage. logOn -> ERROR: ', err);
      this.globals.hideLoading();

    })
    });
  }
  

  goToAssistenza(): void {

      let alertAssistenza = this.alert.create({
        title: 'Assitenza',
        message: 'Per favore inviate una email all\indirizzo <a href="mailto:supporto@oxygencar.it">supporto@oxygencar.it</a>',
        buttons: [
          {
            text: "Ok",
            role: 'cancel',
            handler: () => {
              console.log('Dismiss assistenza alert');
            }
          },
     
        ]
      });
      alertAssistenza.present();
    
    console.log('LoginPage. goToAssistenza...');
  }

  goToRecuperaPassword(): void {
    this.navCtrl.push(RecoverPage);
  }

}
