import { Injectable } from '@angular/core';
import { Api } from './api';

@Injectable()
export class GeneralProvider {
  private _options: any;
  private _comune: any[] = [];
  private _countries: any[] = [];

	constructor(public api: Api) {
    console.log('Hello GeneralProvider Provider');
  } 

  /**
   * Drow-down  calls  (populate  dropdowns  in  the  Insert  Views)
   * 1-Insert  options
   * @param tipoID id of tipo
   */
  getOptions(tipoID: number) {
    let promise = new Promise((resolve, reject) => {
      if (this._options != null && this._options.TipoID == tipoID) {
        resolve(this._options);
        return;
      } 

      let params = {
        TipoID: tipoID
      };
    
      this.api.get('Pratica/GetOptions/matteo.polacchini@sitesolutions.it/matteomatteo/', params).subscribe((res: any) => {
        if (res.success) {
          this._options = res.data;
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
      if (this._countries.length > 0) {
        resolve(this._comune);
        return;
      } 

      this.api.get('Pratica/GetComune/matteo.polacchini@sitesolutions.it/matteomatteo/').subscribe((res: any) => {
        if (res.success) {
          this._comune = res.data;
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
      if (this._countries.length > 0) {
        resolve(this._countries);
        return;
      } 

      this.api.get('Pratica/GetCountry/matteo.polacchini@sitesolutions.it/matteomatteo/').subscribe((res: any) => {
        if (res.success) {
          this._countries = res.data;
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
