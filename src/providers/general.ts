import { Injectable } from '@angular/core';
import { Api } from './api';

@Injectable()
export class GeneralProvider {
	constructor(public api: Api) {
    console.log('Hello GeneralProvider Provider');
  } 

  /**
   * Drow-down  calls  (populate  dropdowns  in  the  Insert  Views)
   * 1-Insert  options
   * @param tipoID id of tipo
   */
  getOptions(tipoID: number) {
    let params = {
      TipoID: tipoID
    };

    let promise = new Promise((resolve, reject) => {
      this.api.get('Pratica/GetOptions/matteo.polacchini@sitesolutions.it/matteomatteo/', params).subscribe((res: any) => {
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
   * Drow-down  calls  (populate  dropdowns  in  the  Insert  Views)
   * 1-City  Selection
   */
  getComune() {
    let promise = new Promise((resolve, reject) => {
      this.api.get('Pratica/GetComune/matteo.polacchini@sitesolutions.it/matteomatteo/').subscribe((res: any) => {
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
   * Drow-down  calls  (populate  dropdowns  in  the  Insert  Views)
   * 3-Country  Selection
   */
  getCountry() {
    let promise = new Promise((resolve, reject) => {
      this.api.get('Pratica/GetCountry/matteo.polacchini@sitesolutions.it/matteomatteo/').subscribe((res: any) => {
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
