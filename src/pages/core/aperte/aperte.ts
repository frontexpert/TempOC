import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { PracticesProvider } from '../../../providers/practices';
import { PhotosProvider } from '../../../providers/photos';
import { DocumentsProvider } from '../../../providers/documents';
import { Globals } from '../../../shared/globals';
import { CarRentalProvider } from '../../../providers/car-rental';
import { PracticeEditPage } from '../practice/practice-edit/practice-edit';
import { NewPracticePage } from '../practice/new-practice/new-practice';

import * as CONSTANTS from '../../../shared/constants';
import { QuoteTabComponent } from '../shared/pratica-edit-form/quote-tab/quote-tab';
import { SwitcherComponent } from '../../../components/switcher/switcher';


@IonicPage()
@Component({
  selector: 'page-aperte',
  templateUrl: 'aperte.html',
})
export class ApertePage {


  //@ViewChild(SwitcherComponent) switcher: SwitcherComponent;
  @ViewChild('switchAperte') this_switcher: SwitcherComponent;
  @ViewChild('quoteTab') thisQuoteTab: QuoteTabComponent;

  searchTerm: string = '';

  activeItemID: number;         // active item ID

  praticeDetails: any;   // selected a pratica item
  paymentDetails: any;   // payment deteails for selected pratica item
  photoDetails: any;     // photo data for selected pratica item
  documentDetails: any    // document data for selected one
  quoteList: any[];
  noleggioList: any[];

  tabValues = CONSTANTS.PRATICHE_TAB_VALUES;

  checkedTabs: Array<number> = [];

  selectedTab: number = 0;

  minListIndex: number = 0;
  maxListIndex: number = 50;
  page: number = 0;

  //praticaList: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams, 
              public _practices: PracticesProvider, 
              private _photos: PhotosProvider,
              private _documents: DocumentsProvider,
              private _carRental: CarRentalProvider,
              public events: Events,
              public globals: Globals) {
              
  }

  ngOnInit() {
    console.log('ngOnInit');
    

    if (this._practices.aperte_list.length == 0) {
      // show loading spinner
      this.globals.showLoading().then(() => {
        // load list 
        this._practices.get(this.page).then((res: any) => {
          console.log("Success in this.practices.get()");
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
      });
    }

  }

  doRefresh(refresher){
    this._practices.getAllPratices().then(function() {
      refresher.complete();
    })
  }

  ionViewWillEnter() {
    console.log('subscribe   ApertePage');

    

    this.events.subscribe('documentDetails-refresh', () => {
      this.globals.showLoading().then(() => {
        this._documents.getDocuments(this.activeItemID).then(res => {
          this.documentDetails = res;
          this.globals.hideLoading();
        })
        .catch(err => {
          console.log('Get details ERROR:', err);
          this.globals.hideLoading();
        });
      })
    });

    this.events.subscribe('quote-refresh', () => {
      this.globals.showLoading().then(() => {
        this._practices.getQuoteList(this.activeItemID).then((res: any) => {
          this.quoteList = res;
          this.globals.hideLoading();
        })
      })
    });


      console.log('subscribe   InLavorazionePage');
      this.events.subscribe('pratica-refresh', (item) => {
        //alert(item);
        this.refreshPraticeItem(item);
      });
    

  }
  ionViewWillLeave() {
    this.events.unsubscribe('documentDetails-refresh');
    this.events.unsubscribe('pratica-refresh');
    this.events.unsubscribe('quote-refresh');
    console.log('unsubscribe   ApertePage');
  }
  /**
   * On select a pratice item
   * @param item selected item
   */
  selectPraticeItem(item: any): void {

    if (this.activeItemID != item.ID) {
      this.activeItemID = item.ID;    

      
     

      // get pratica details and payment details
      this.globals.showLoading().then(() => {

        let promises = [
          this._practices.getDetails(item.ID), 
          this._practices.getPaymentDetails(item.ID), 
          this._photos.getPhotos(item.ID),
          this._documents.getDocuments(item.ID),
          this._practices.getQuoteList(item.ID),
          this._carRental.getNoleggioList(item.ID)
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

            this.noleggioList = values[5];
            console.log(this.noleggioList, 'noleggioList');

            
            

            console.log('TAB VALUES');
            console.log(this.tabValues);

            //this.tabValues = CONSTANTS.PRATICHE_TAB_VALUES;
            //this.tabValues.splice(0, 1);
            //this.tabValues.splice(1, 1);
    
            if(this.paymentDetails.DatiPratica == null)
            {
              this.tabValues = CONSTANTS.PRATICHE_TAB_VALUES_1;
              //this.tabValues.unshift({text: 'outlook', value: 0});
            } else {
              this.tabValues = CONSTANTS.PRATICHE_TAB_VALUES;
              //this.tabValues.unshift({text: 'pagamento', value: 1});
              //this.tabValues.unshift({text: 'outlook', value: 0});
            }

            this.globals.hideLoading();
              // change selected tab to first one
     this.selectedTab = 0;

          })
          .catch(err => {
            console.log('Get details ERROR:', err);
            this.globals.hideLoading();
          });
  
        // set mark for sub-tabs
        if (item.ImmaginiCount > 0) {
          this.checkedTabs.push(2); // photo marked
        } else {
          let index = this.checkedTabs.indexOf(2);
          if (index > -1) {
            this.checkedTabs.splice(index, 1);
          }
        }
  
        if (item.DocumentiCount > 0) {
          this.checkedTabs.push(3); // documenti marked
        } else {
          let index = this.checkedTabs.indexOf(3);
          if (index > -1) {
            this.checkedTabs.splice(index, 1);
          }
        }
  
        if (item.PreventiviCount > 0) {
          this.checkedTabs.push(4); // preventivi marked
        } else {
          let index = this.checkedTabs.indexOf(4);
          if (index > -1) {
            this.checkedTabs.splice(index, 1);
          }
        }

        if (item.NoleggiCount > 0) {
          this.checkedTabs.push(5); // Noleggi marked
        } else {
          let index = this.checkedTabs.indexOf(5);
          if (index > -1) {
            this.checkedTabs.splice(index, 1);
          }
        }
      });

     

    }

    
    
  }

  refreshPraticeItem(item: any): void {
    console.log('refresh');
    //this.navCtrl.setRoot(this.navCtrl.getActive().component).then(function() {
      
    //});

  }

  /**
   * Go to pratica edit page
   * @param {number} id  pratica id
   * @param {number} tipoID  tipo id
   */
  public editPractice(id: number, tipoID: number): void {
    this.navCtrl.push(PracticeEditPage, {
      ID: id,
      TipoID: tipoID
    });
  }

  /**
   * Go to new practice page
   */
  public createNewPractice(): void {
    this.navCtrl.push(NewPracticePage);
  }

}