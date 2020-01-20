import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { CorePage } from '../core/core';
import { PracticesProvider } from '../../providers/practices';
import { LoginProvider } from '../../providers/login';
import { Globals } from '../../shared/globals';

@Component({
  selector: 'page-recover',
  templateUrl: 'recover.html',
})
export class RecoverPage {

  msg: string = '';

  recover = {
    username: '',
    ragione_sociale: '',
    email: ''
  };

  constructor(public navCtrl: NavController, private _practice: PracticesProvider, private _login: LoginProvider, public globals: Globals) {

  }

  ionViewDidLoad() {
    console.log('LoginPage ionViewDidLoad');
  }

  recoverPassword() {
    if(this.recover.username == '' || this.recover.username == null)
    {
      this.msg = "Per favore inserisci il tuo nome utente.";
      return;
    }

    this.globals.showLoading().then(() => {

      this._login.recoverPassword(this.recover.username).then((res: any) => {
        this.globals.hideLoading();
        if(res == "OK") {
            this.msg = "Password inviata correttamente, riceverai una mail entro pochi minuti..."
        } else {
          this.msg = "Si è verificato un errore: " + res;
        }
      }).catch(err => {
        this.globals.showToastError('errore server in fase di autenticazione');
        console.log('LoginPage. logOn -> ERROR: ', err);
        this.globals.hideLoading();
      })
    });
  }

  richiediCredenziali() {
    if(this.recover.ragione_sociale == '' || this.recover.ragione_sociale == null || this.recover.email == '' || this.recover.email == null)
    {
      this.msg = "Per favore inserisci ragione sociale e indirizzo e-mail.";
      return;
    }

    this.globals.showLoading().then(() => {

      this._login.recoverCredenziali(this.recover.ragione_sociale, this.recover.email).then((res: any) => {
        this.globals.hideLoading();
        if(res == "OK") {
            this.msg = "Credenziali inviate correttamente, riceverai una mail entro pochi minuti..."
        } else {
          this.msg = "Si è verificato un errore: " + res;
         
        }
      }).catch(err => {
        this.globals.showToastError('errore server in fase di autenticazione');
        console.log('LoginPage. logOn -> ERROR: ', err);
        this.globals.hideLoading();
      })
    });
  }

}
