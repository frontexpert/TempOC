import { Injectable } from '@angular/core';
import { Api } from './api';

/*
  Generated class for the PracticesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PracticesProvider {

  public aperte_list: Array<any> = [];

  public lavorazione_list: Array<any> = [];

  public chiuse_list: Array<any> = [];

  constructor(public api: Api) {
    console.log('Hello PracticesProvider Provider');
  }

  /**
   * Get pratica list
   * @param pageNumber index of page
   * @param pageSize size of page
   * @return {Promise}
   */
  get(pageNumber: number, pageSize: number = 50) {
    let promise = new Promise((resolve, reject) => {
      let params = {
        Page: pageNumber,
        Pagesize: pageSize
      };
      this.api.get('Pratica/List/matteo.polacchini@sitesolutions.it/matteomatteo', params).subscribe((res: any) => {
          if (res.success) {
          console.log(res.data);
          this.filterPraticaList(res.data);
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
   * Get all pratica list
   * @return {Promise}
   */
  getAllPratices() {
    let promise = new Promise((resolve, reject) => {
      this.api.get('Pratica/List/matteo.polacchini@sitesolutions.it/matteomatteo').subscribe((res: any) => {
        if (res.success) {
          console.log(res.data);
          this.filterPraticaList(res.data);
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
   * Get practice quote list
   * @param id id of practice
   */
  getQuoteList(id: number) {
    let params = {
      PraticaID: id
    };

    let promise = new Promise((resolve, reject) => {
      this.api.get('PraticaPreventivo/List/matteo.polacchini@sitesolutions.it/matteomatteo/', params).subscribe((res: any) => {
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
   * Send a POST request to Pratica Insert
   * @param body
   */
  post(body: any) {    
    let promise = new Promise((resolve, reject) => {
      this.api.post('Pratica/Insert/matteo.polacchini@sitesolutions.it/matteomatteo/', body).subscribe((res: any) => {
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
   * classify the full pratica list response data into three classes(by state)
   * @param {Array<any>} pratica_list [description]
   */
  private filterPraticaList(pratica_list: Array<any>) {
    if (pratica_list.length > 0) {
      this.aperte_list = pratica_list.filter(item => {
        return item.StatoMacroID == 1;
      });      
      console.log('aperte_list', this.aperte_list)
      this.lavorazione_list = pratica_list.filter(item => {
        return item.StatoMacroID == 2;
      });
      console.log('lavorazione_list', this.lavorazione_list)
      this.chiuse_list = pratica_list.filter(item => {
        return item.StatoMacroID == 3;
      });
      console.log('chiuse_list', this.chiuse_list)      
    }
  }

}
