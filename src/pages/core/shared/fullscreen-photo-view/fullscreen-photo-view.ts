import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Globals } from '../../../../shared/globals';
// import { File } from '@ionic-native/file';
// import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';

@IonicPage()
@Component({
  selector: 'page-fullscreen-photo-view',
  templateUrl: 'fullscreen-photo-view.html',
})
export class FullscreenPhotoViewPage {

  imageSrc: string = "";
  
  constructor(public navCtrl: NavController, params: NavParams, private viewCtrl: ViewController, private globals: Globals) {
    if (params.get('imgSrc')) {
      this.imageSrc = params.get('imgSrc');
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FullscreenPhotoViewPage');
  }  

  /**
   * Close modal page
   */
  closeModal(): void {
    this.viewCtrl.dismiss();
  }
}
