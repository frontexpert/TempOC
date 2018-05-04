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


}