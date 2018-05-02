import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import * as Constants from '../../../shared/constants';
import { PracticesProvider } from '../../../providers/practices';
import { PhotosProvider } from '../../../providers/photos';
import { DocumentsProvider } from '../../../providers/documents';
import { Globals } from '../../../shared/globals';

/**
 * Generated class for the PratichePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chiuse',
  templateUrl: 'chiuse.html',
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChiusePage {

  searchTerm: string = '';

  activeItemID: number;         // active item ID

  praticeDetails: any;   // selected a pratica item
  paymentDetails: any;   // payment deteails for selected pratica item
  photoDetails: any;     // photo data for selected pratica item
  documentDetails: any    // document data for selected one
  quoteList: any[];

  tabValues = Constants.PRATICHE_TAB_VALUES;

  checkedTabs: Array<number> = [];

  selectedTab: number = 0;

  minListIndex: number = 0;
  maxListIndex: number = 50;
  page: number = 0;

  //praticaList: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private _practice: PracticesProvider, 
              private _photos: PhotosProvider,
              private _documents: DocumentsProvider,
              public globals: Globals) {
  }

  ngOnInit() {
    console.log('ngOnInit');
    if (this.globals.praticaList.length == 0) {
      // show loading spinner
      this.globals.showLoading();
      // load list 
      this._practice.get(this.page).then((res: any) => {
        console.log("Success in this._practice.get()");
        if (this.globals.praticaList.length == 0) this.globals.praticaList = res;
        // hide loading spinner
        this.globals.hideLoading();
      })
      .catch(err => {
        console.log("Success in this._practice.get()");
        console.log(err);
        // hide loading spinner
        this.globals.hideLoading();
      });
    }
  }

  /**
   * On select a pratice item
   * @param item selected item
   */
  selectPraticeItem(item: any): void {   
    if (this.activeItemID != item.ID) {
      this.activeItemID = item.ID;    

      // change selected tab to first one
      //this.selectedTab = 0;

      // get pratica details and payment details
      this.globals.showLoading().then(() => {

        let promises = [
          this._practice.getDetails(item.ID), 
          this._practice.getPaymentDetails(item.ID), 
          this._photos.getPhotos(item.ID),
          this._documents.getDocuments(item.ID),
          this._practice.getQuoteList(item.ID)
        ];

        Promise.all(promises).then((values: any[]) => {            
            this.praticeDetails = values[0]; // set pratice details
            console.log(this.praticeDetails, 'praticeDetails');
            
            this.paymentDetails = values[1];
            console.log(this.paymentDetails, 'paymentDetails');

            this.photoDetails = values[2];
            console.log(this.photoDetails, 'photoDetails');

            this.documentDetails = values[3];
            console.log(this.documentDetails, 'documentDetails');

            this.quoteList = values[4];
            console.log(this.quoteList, 'quoteList');
            
            this.globals.hideLoading();
          })
          .catch(err => {
            console.log('Get details ERROR:', err);
            this.globals.hideLoading();
          });
  
        // set mark for sub-tabs
        if (item.ImmaginiCount > 0) {
          this.checkedTabs.push(2); // photo marked
        }
  
        if (item.DocumentiCount > 0) {
          this.checkedTabs.push(3); // documenti marked
        }
  
        if (item.PreventiviCount > 0) {
          this.checkedTabs.push(4); // preventivi marked
        }
  
        if (item.NoleggiCount > 0) {
          this.checkedTabs.push(5); // Noleggi marked
        }
      });
    }
  }

  doInfinite(mode): Promise<any> {
    console.log('Begin async operation: ' + mode);

    return new Promise((resolve) => {
      this.page ++;
      this._practice.get(this.page).then((res: any) => {
        this.globals.praticaList = this.globals.praticaList.concat(res);
        //this.globals.praticaList = res;
        console.log('this.globals.praticaList');
        console.log(this.globals.praticaList);
        resolve();
      })
      .catch(err => {
        this.page --;
        resolve();
        console.log(err);
      });
    });
  }

}
