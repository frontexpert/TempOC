import { Injectable } from '@angular/core';
import { Api } from './api';

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
   * @param pageNumber index of page
   * @param pageSize size of page
   * @return {Promise}
   */
  get(pageNumber: number, pageSize = 30) {
    let promise = new Promise((resolve, reject) => {
      let params = {
        Page: pageNumber,
        Pagesize: pageSize
      };
      //this.api.get('Pratica/List/matteo.polacchini@sitesolutions.it/matteomatteo', params).subscribe((res: any) => {
      this.api.get('Pratica/List/matteo.polacchini@sitesolutions.it/matteomatteo').subscribe((res: any) => {
          if (res.success) {
          console.log(res.data);
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
   * @return {Promise}
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
   * @return {Promise}
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

  /**
   * Remove a pratic image
   * @param ID Image Id
   * @param praticaID Id of pratica
   * @return {Promise}
   */
  removePraticeImage(ID: number, praticaID: number) {
    let promise = new Promise((resolve, reject) => {
      let params = {
        ID: ID,
        PraticaID: praticaID
      };

      this.api.get('PraticaImmagine/Remove/matteo.polacchini@sitesolutions.it/matteomatteo/', params).subscribe((res: any) => {
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
