import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

import * as Constants from '../shared/constants';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  url: string = Constants.API_URL;

  private _username: string = '';
  private _password: string = '';

  get username() {
    return this._username;
  }

  set username(v) {
    if (v !== this.username) {
      this._username = v;
    }
  }

  get password() {
    return this._password;
  }

  set password(v) {
    if (v !== this.password) {
      this._password = v;
    }
  }

  constructor(public http: HttpClient, private transfer: FileTransfer) {
  }

  get(endpoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params = reqOpts.params.append(k, params[k]);
      }
    }
    return this.http.get(this.url + '/' + endpoint, reqOpts);
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    return this.http.post(this.url + '/' + endpoint, body, reqOpts);
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }

  delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(this.url + '/' + endpoint, reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }


/**
   * Send a POST request to add a pratica photo
   * @param praticaID id of pratica
   * @param photoData image data
   * @return {Promise} FileResult promise
   */
  postRentPhoto(params: any, photoData: any) {    
    const fileTransfer: FileTransferObject = this.transfer.create();

    // MATTEO - così recuperiamo il nome dato dal sistema operativo:
    let sPhotoNames = photoData.split('/');
    let sPhotoName = sPhotoNames[sPhotoNames.length - 1];

    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: sPhotoName,
      headers: {},
      params: params
    };

    console.log(photoData, 'photoData');
    let promise = new Promise((resolve, reject) => {
      fileTransfer.upload(photoData, Constants.API_URL + '/NoleggioSinistroImmagine/Add/' + this.username + '/' + this.password, options)
      .then((data) => {
        resolve(JSON.parse(data.response));
      }, (err) => {
        console.log('File Upload Error:', err);
        reject(err);
      });
    });

    return promise;
  }


  /**
   * Send a POST request to add a pratica photo
   * @param praticaID id of pratica
   * @param photoData image data
   * @return {Promise} FileResult promise
   */
  postPhoto(params: any, photoData: any) {    
    const fileTransfer: FileTransferObject = this.transfer.create();

    // MATTEO - così recuperiamo il nome dato dal sistema operativo:
    let sPhotoNames = photoData.split('/');
    let sPhotoName = sPhotoNames[sPhotoNames.length - 1];

    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: sPhotoName,
      headers: {},
      params: params
    };

    console.log(photoData, 'photoData');

    return fileTransfer.upload(photoData, Constants.API_URL + '/PraticaImmagine/Add/' + this.username + '/' + this.password, options)
      .then((data) => {
        console.log("data");
        console.log(data);
        console.log("JSON.parse(data.response)");
        console.log(JSON.parse(data.response));
        return JSON.parse(data.response);
      }, (err) => {
        console.log('File Upload Error:', err);
        return err;
      });
  }

  postDocument(praticaID: number, documenetData: any) {    
    const fileTransfer: FileTransferObject = this.transfer.create();

    // MATTEO - così recuperiamo il nome dato dal sistema operativo:
    let sPhotoNames = documenetData.split('/');
    let sPhotoName = sPhotoNames[sPhotoNames.length - 1];

    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: sPhotoName,
      headers: {},
      params: {
        PraticaID: praticaID
      }
    };

    console.log(documenetData, 'photoData');

    return fileTransfer.upload(documenetData, Constants.API_URL + '/PraticaDocumento/Add/' + this.username + '/' + this.password, options)
      .then((data) => {
        console.log("data");
        console.log(data);
        console.log("JSON.parse(data.response)");
        console.log(JSON.parse(data.response));
        return JSON.parse(data.response);
      }, (err) => {
        console.log('File Upload Error:', err);
        return err;
      });
  }
}
