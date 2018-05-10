import { Injectable } from '@angular/core';
import { Platform, LoadingController, AlertController } from 'ionic-angular';


@Injectable()
export class Globals {

  activeSideMenuItem: string = 'aperte';
  praticaList = [];

  praticaTipoID: number;

  /**
   * Loading spinner instance
   * @type {any}
   */
  private _loadingSpinner: any = null;
  private is_loading: boolean = false;

  constructor(public loadingCtrl: LoadingController) {
    this._loadingSpinner = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: ``
    });
  }

  /**
   * Show loading spinner
   */
  showLoading() {
    let promise = new Promise((resolve, reject) => {
      if (this.is_loading == true) {
        resolve();
      }
      else {
        if (this._loadingSpinner == null) {
          this._loadingSpinner = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: ``
          });
          this._loadingSpinner.present().then(() => {
            this.is_loading = true;
            resolve();
          });
        }
        else {
          this._loadingSpinner.present().then(() => {
            this.is_loading = true;
            resolve();
          });
        }
      }
    });

    return promise;
  }

  /**
   * Hide loading spinner
   */
  hideLoading(): void {
    if (this.is_loading) {
      this._loadingSpinner.dismiss();
      this.is_loading = false;
      this._loadingSpinner = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: ``
      });
    }
  }

  /**
   * Parse array of response to Select list array
   * @param  {Array<any>} array from response
   * @return {Array<any>} select list array
   */
  public parseArrayToSelectList(arr: Array<any>): Array<any> {
    let returnArray: Array<any> = [];
    if (arr == undefined) {
      return returnArray;
    }
    
    arr.forEach(v => {
      returnArray.push({
        value: v.ID,
        text: v.Nome
      });
    });
    return returnArray;
  }

  /**
   * Parse array of response to Select list array
   * @param  {Array<any>} array from response
   * @return {Array<any>} select list array
   */
  public parseCircostanzeToSelectList(arr: Array<any>): Array<any> {
    let returnArray: Array<any> = [];
    if (arr == undefined) {
      return returnArray;
    }

    arr.forEach(v => {
      returnArray.push({
        value: v.ID,
        text: v.Circostanza
      });
    });
    return returnArray;
  }

  /**
   * Parse array of response to Autocomplete list for country
   * @param  {Array<any>} array from response
   * @return {Array<any>} select list array
   */
  public parseCountryToAutocompleteList(arr: Array<any>): Array<any> {
    let returnArray: Array<any> = [];

    if (arr == undefined) {
      return returnArray;
    }

    arr.forEach(v => {
      returnArray.push({
        name: v.Nome
      });
    });

    return returnArray;
  }

  /**
   * Parse array of response to Autocomplete list for city
   * @param  {Array<any>} array from response
   * @return {Array<any>} select list array
   */
  public parseCityToAutocompleteList(arr: Array<any>): Array<any> {
    let returnArray: Array<any> = [];

    if (arr == undefined) {
      return returnArray;
    }

    arr.forEach(v => {
      returnArray.push({
        name: v.NomeCompleto
      });
    });

    return returnArray;
  }


}