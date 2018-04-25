import { Injectable } from '@angular/core';
import { Platform, LoadingController, AlertController } from 'ionic-angular';


@Injectable()
export class Globals {

  activeSideMenuItem: string = 'aperte';
  praticaList = [];

  /**
   * Loading spinner instance
   * @type {any}
   */
  private _loadingSpinner: any = null;

  constructor(public loadingCtrl: LoadingController) {

  }

  /**
   * Show loading spinner
   */
  showLoading(): void {
    if (this._loadingSpinner == null) {
      this._loadingSpinner = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: ``
      });
      this._loadingSpinner.present();
    }
  }

  /**
   * Hide loading spinner
   */
  hideLoading(): void {
    if (this._loadingSpinner) {
      this._loadingSpinner.dismiss();
      this._loadingSpinner = null;
    }
  }


}