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
            this.storage.get(Constants.DOCUEMTNS_KEY).then(docsData => {
              if (docsData == null || docsData == undefined)
                docsData = {};
              else 
                docsData[praticaID] = res.data;              
              this.storage.set(Constants.DOCUEMTNS_KEY, docsData);
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


  deleteDocuments(documents: Array<any>, praticaID: number) {
    let promise = new Promise((resolve, reject) => {
      documents.forEach(documentItem => {
        let body = {
          ID: documentItem.ID,
          PraticaID: praticaID
        }
        this.api.post('PraticaDocumento/Remove/matteo.polacchini@sitesolutions.it/matteomatteo/', body).subscribe((res: any) => {
          console.log("remove Document");
          console.log(res);
          if (res.success) {            
            // this.storage.get(Constants.PHOTOS_KEY).then(photoesData => {
            //   if (photoesData == null || photoesData == undefined)
            //     photoesData = {};
            //   else {
            //     let index = photoesData[praticaID].indexOf(photoItem.ID, 0);
            //     if (index > -1) {
            //       photoesData[praticaID].splice(index, 1);
            //     }
            //   }
            //   this.storage.set(Constants.PHOTOS_KEY, photoesData);
            //   resolve(photoesData);
            // });
            resolve(res.data);
          }
          else
            resolve(res);
        }, (err) => {
          reject(err);
        });
      });
    });

    return promise;
  }  

  addDocumentTemp(praticaID, modello) {
    let promise = new Promise((resolve, reject) => {
      let body = {
        PraticaID: praticaID,
        Modello: modello
      }
      this.api.post('Pratica/SaveModelloDocumento/matteo.polacchini@sitesolutions.it/matteomatteo/', body).subscribe((res: any) => {
        console.log("add Document by template");
        console.log(res);
        if (res.success) {            
          // this.storage.get(Constants.PHOTOS_KEY).then(photoesData => {
          //   if (photoesData == null || photoesData == undefined)
          //     photoesData = {};
          //   else {
          //     let index = photoesData[praticaID].indexOf(photoItem.ID, 0);
          //     if (index > -1) {
          //       photoesData[praticaID].splice(index, 1);
          //     }
          //   }
          //   this.storage.set(Constants.PHOTOS_KEY, photoesData);
          //   resolve(photoesData);
          // });
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


  addDocument(praticaID: number, documentData: any) {        
    // if (this.connection.isOnline()) {
      return this.api.postDocument(praticaID, documentData).then(res => {
        // set uploaded documnets to local storage
        this.storage.get(Constants.DOCUEMTNS_KEY).then(documentsData => {
          if (documentsData == null || documentsData == undefined)
            documentsData = {};
          if (documentsData[praticaID] == undefined)
            documentsData[praticaID] = [];
          console.log(res, 'addDocument');
          res.data.forEach(document => {
            documentsData[praticaID].push({
              ID: document.ID,
              Url: document.Url,
              Checked: false
            });
          });

          this.storage.set(Constants.PHOTOS_KEY, documentsData);
        })
        return res;
      });
  }
  
}
