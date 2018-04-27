import { Injectable } from '@angular/core';
import { Api } from '../api/api';

/*
  Generated class for the PracticesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PracticesProvider {

  constructor(public api: Api) {
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
      this.api.get('Pratica/Details/matteo.polacchini@sitesolutions.it/matteomatteo/', params).subscribe((res: any) => {
        if (res.success) {
          resolve(res.data);
        }
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
  getPaymentDetails(id: number) {
    let params = {
      ID: id
    };

    let promise = new Promise((resolve, reject) => {
      this.api.get('PraticaPagamento/Details/matteo.polacchini@sitesolutions.it/matteomatteo/', params).subscribe((res: any) => {
        if (res.success) {
          resolve(res.data);
        }
        else
          resolve(res);
      }, (err) => {
        reject(err);
      });
    });

    return promise;
  }

  /**
   * Get pratica image list
   * @param praticaID pratica id
   * @return {Promise}
   */
  getPraticeImageList(praticaID: number) {
    let promise = new Promise((resolve, reject) => {
      let params = {
        PraticaID: praticaID
      };

      this.api.get('PraticaImmagine/List/matteo.polacchini@sitesolutions.it/matteomatteo/', params).subscribe((res: any) => {
        if (res.success) {
          resolve(res.data);
        }
        else
          resolve(res);
      }, (err) => {
        reject(err);
      });
    });

    return promise;
  }

}
