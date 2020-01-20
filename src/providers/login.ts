import { Injectable } from '@angular/core';
import { Api } from './api';
import { Globals } from '../shared/globals';
import { Noleggio, Sinistri, Rientro } from '../models/noleggio';

@Injectable()
export class LoginProvider {
	constructor(public api: Api,
              public globals: Globals) {
    console.log('Hello CarRentalProvider Provider');
  } 

  logOn(username: string, password: string) {
    let promise = new Promise((resolve, reject) => {
      let body = {
        Username: username,
        Password: password
      };
      this.api.post('Auth/LogOn', body).subscribe((res: any) => {
          if (res.success) {
          

          if(res.data.Username != '' && res.data.Username != null && res.data.Password != '' && res.data.Password != null)
          {
            console.log("LoginProvider. MEMORIZZO CREDENZIALI IN API");
            //Associo username ad Api
            this.api.username = res.data.Username;
            this.api.password = res.data.Password;
            resolve("OK");
          } else {
            resolve("CREDENZIALI NON VALIDE");
          }
          //resolve(res.data);
        }
        else
          resolve(res);
      }, (err) => {
        console.log("Auth/LogOn error", err);
        reject(err);
      });
    });

    return promise;
  }

  recoverPassword(username: string) {
    let promise = new Promise((resolve, reject) => {
      let body = {
        Username: username
      };
      this.api.post('Auth/RecuperaCredenziali', body).subscribe((res: any) => {
        if (res.success) {
          resolve("OK");
        }
        else
          resolve(res);
      }, (err) => {
        console.log("recoverPassword error", err);
        reject(err);
      });
    });

    return promise;
  }

  recoverCredenziali(ragione_sociale: string, email: string) {
    let promise = new Promise((resolve, reject) => {
      let body = {
        RagioneSociale: ragione_sociale,
        Email: email
      };
      this.api.post('Auth/RecuperaCredenziali', body).subscribe((res: any) => {
        if (res.success) {
            resolve("OK");
        }
        else
          resolve(res);
      }, (err) => {
        console.log("recoverCredenziali error", err);
        reject(err);
      });
    });

    return promise;
  }

  logOff() {
    
    let promise = new Promise((resolve, reject) => {

      this.api.username = '';
      this.api.password = '';
      resolve("OK");

    });

    return promise;
  }
  
}
