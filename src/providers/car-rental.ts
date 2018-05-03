import { Injectable } from '@angular/core';
import { Api } from './api';

@Injectable()
export class CarRentalProvider {
	constructor(public api: Api) {
    console.log('Hello CarRentalProvider Provider');
  } 

  /**
   * Get practice noleggio list
   * @param id id of practice
   * @param page index of page. default is 0
   * @param pageSize count of a page. default is 10
   */
  getNoleggioList(id: number, page: number = 0, pageSize: number = 10) {
    let params = {
      PraticaID: id,
      Page: page,
      PageSize: pageSize
    };

    let promise = new Promise((resolve, reject) => {
      this.api.get('Noleggio/List/matteo.polacchini@sitesolutions.it/matteomatteo/', params).subscribe((res: any) => {
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
