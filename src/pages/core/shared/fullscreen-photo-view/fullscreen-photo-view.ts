import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-fullscreen-photo-view',
  templateUrl: 'fullscreen-photo-view.html',
})
export class FullscreenPhotoViewPage {

  photos: Array<any> = [];
  activeIndex: number;
  
  constructor(public navCtrl: NavController, params: NavParams, private viewCtrl: ViewController) {
    this.photos = params.get('photos');
    this.activeIndex = params.get('activeIndex') || 0;
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
