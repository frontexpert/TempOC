import { Injectable } from '@angular/core';
import { Platform, LoadingController, AlertController } from 'ionic-angular';
import { Country, Comune, Common, CompleteListItem, Circostanze } from '../models/general';
import { ToastrService } from 'ngx-toastr';


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

  constructor(public loadingCtrl: LoadingController, private toastr: ToastrService) {
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
   * @return {Array<CompleteListItem>} select list array
   */
  public parseArrayToSelectList(arr: Array<Common>): Array<CompleteListItem> {
    let returnArray: Array<CompleteListItem> = [];
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
   * @param  {Array<Circostanze>} array from response
   * @return {Array<CompleteListItem>} select list array
   */
  public parseCircostanzeToSelectList(arr: Array<Circostanze>): Array<CompleteListItem> {
    let returnArray: Array<CompleteListItem> = [];
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
   * @param  {Array<Country>} array from response
   * @return {Array<CompleteListItem>} select list array
   */
  public parseCountryToAutocompleteList(arr: Array<Country>): Array<CompleteListItem> {
    let returnArray: Array<CompleteListItem> = [];

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
   * @param  {Array<Comune>} array from response
   * @return {Array<CompleteListItem>} select list array
   */
  public parseCityToAutocompleteList(arr: Array<Comune>): Array<CompleteListItem> {
    let returnArray: Array<CompleteListItem> = [];

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

  /**
   * Show toast windows in the bottom of window
   * duration is default 3000
   * @param {string} msg message text
   */
  public showToastSuccess(msg: string) {
    this.toastr.success(msg);
  }

  public showToastInfo(msg: string) {
    this.toastr.info(msg);
  }

  public showToastError(msg: string) {
    this.toastr.error(msg);
  }


}