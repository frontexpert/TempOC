import { Injectable } from '@angular/core';
import { Api } from '../api/api';
import { Globals } from '../../shared/globals';

/*
  Generated class for the PracticesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PracticesProvider {

  private _praticaDetails: any;

  private _praticaPaymentDetails: any;

  constructor(public api: Api, private globals: Globals) {
    console.log('Hello PracticesProvider Provider');
  }

  /**
   * Get pratica list
   */
  get() {
    let promise = new Promise((resolve, reject) => {
      this.api.get('Pratica/List/matteo.polacchini@sitesolutions.it/matteomatteo/').subscribe((res: any) => {
        if (res.success)
          resolve(res.data);
        else
          resolve(res);
      }, (err) => {
        reject(err);
      });
    });

    return promise;
  }

  /**
   * Get a pratica details by id
   * @param id pratica id
   */
  getDetails(id: number) {
    let params = {
      ID: id
    };

    let promise = new Promise((resolve, reject) => {
      if (this._praticaDetails && this._praticaDetails.ID == id) {
        resolve(this._praticaDetails);
      }
      else {
        this.globals.showLoading();

        this.api.get('Pratica/Details/matteo.polacchini@sitesolutions.it/matteomatteo/', params).subscribe((res: any) => {
          this.globals.hideLoading();
          if (res.success) {
            this._praticaDetails = res.data;
            resolve(res.data);
          }
          else
            resolve(res);
        }, (err) => {
          this.globals.hideLoading();
          reject(err);
        });        
      }
    });

    return promise;
  }

  /**
   * Get a pratica details by id
   * @param id pratica id
   */
  getPaymentDetails(id: number) {
    let params = {
      ID: id
    };

    let promise = new Promise((resolve, reject) => {
      if (this._praticaPaymentDetails && this._praticaPaymentDetails.ID == id) {
        resolve(this._praticaPaymentDetails);
      } 
      else {
        this.globals.showLoading();

        this.api.get('PraticaPagamento/Details/matteo.polacchini@sitesolutions.it/matteomatteo/', params).subscribe((res: any) => {
          this.globals.hideLoading();
          if (res.success) {
            this._praticaPaymentDetails = res.data;
            resolve(res.data);
          }
          else
            resolve(res);
        }, (err) => {
          this.globals.hideLoading();
          reject(err);
        });
      }
    });

    return promise;
  }

}
