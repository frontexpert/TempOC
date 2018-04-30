import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Subject } from 'rxjs/Subject';
import { Api } from './api';
import { NetState } from './network';
import 'rxjs/add/operator/map';

import * as Constants from '../shared/constants';

/*
  Generated class for the PhotosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PhotosProvider {
  photoes: Array<any>;
  private selectedPhotoSubject = new Subject<Array<any>>();

  constructor(public api: Api, public storage: Storage, private connection: NetState) {
    console.log('Hello PhotosProvider Provider');
  }  

  /**
   * Get pratica image list
   * @param praticaID pratica id
   * @return {Promise}
   */
  getPhotos(praticaID: number) {
    if (this.connection.isOnline()) {
      let promise = new Promise((resolve, reject) => {
      let params = {
        PraticaID: praticaID
      };

      this.api.get('PraticaImmagine/List/matteo.polacchini@sitesolutions.it/matteomatteo/', params).subscribe((res: any) => {
          if (res.success) {
            this.storage.get(Constants.PHOTOS_KEY).then(photoesData => {
              if (photoesData == null || photoesData == undefined)
                photoesData = {};
              photoesData[praticaID] = res.data.map(photo => {
                return {
                  ID: photo.ID,
                  Url: photo.Url,
                  Checked: false
                }
              });
              this.storage.set(Constants.PHOTOS_KEY, photoesData);
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
      return this.storage.get(Constants.PHOTOS_KEY).then((photoesData: any) => {
        if (photoesData == undefined || photoesData == null)
          return [];
        let result;
        result = photoesData[praticaID] ? photoesData[praticaID] : [];
        return result;
      })
    }
  }

  /**
   * Remove a pratic image
   * @param ID Image Id
   * @param praticaID Id of pratica
   * @return {Promise}
   */
  deletePhotos(ID: number, praticaID: number) {
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
