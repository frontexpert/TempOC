import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Api } from './api';
import { NetState } from './network';
import 'rxjs/add/operator/map';

import * as Constants from '../shared/constants';

/*
  Generated class for the DocumentsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DocumentsProvider {

  constructor(public api: Api, public storage: Storage, private connection: NetState) {
    console.log('Hello DocumentsProvider Provider');
  }  

  /**
   * Get pratica image list
   * @param praticaID pratica id
   * @return {Promise}
   */
  getDocuments(praticaID: number) {
    if (this.connection.isOnline()) {
      let promise = new Promise((resolve, reject) => {
      let params = {
        PraticaID: praticaID
      };

      this.api.get('PraticaDocumento/List/matteo.polacchini@sitesolutions.it/matteomatteo/', params).subscribe((res: any) => {
          if (res.success) {
            this.storage.get(Constants.DOCUEMTNS_KEY).then(docuementsData => {
              if (docuementsData == null || docuementsData == undefined)
                docuementsData = {};
              else 
                docuementsData[praticaID] = res.data;              
              this.storage.set(Constants.DOCUEMTNS_KEY, docuementsData);
            })
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
    else {
      return this.storage.get(Constants.DOCUEMTNS_KEY).then((documentsData: any) => {
        if (documentsData == undefined || documentsData == null)
          return [];
        let result;
        result = documentsData[praticaID] ? documentsData[praticaID] : [];
        return result;
      });
    }
  }
  
}
