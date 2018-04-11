import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';

import { PracticesPage } from './practices/practices';
import { TemparioPage } from './tempario/tempario';
import { RentalPage } from './rental/rental';

/**
 * Generated class for the CorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-core',
  templateUrl: 'core.html',
})
export class CorePage {
  @ViewChild('coreNav') nav: NavController;
  rootPage = PracticesPage;

  pages = {
    'pratiche': PracticesPage,
    'tempario': TemparioPage,
    'noleggio': RentalPage,
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private iab: InAppBrowser) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CorePage');
  }

  onSidebarNavigate(item) {
    if (item == "car") {
      let options: InAppBrowserOptions = {
        footer: "no",
        toolbarposition: "top"
      }
      const browser = this.iab.create('http://oxygen2.ilcarrozziere.it', '_blank', options);
      browser.show();
    }
    else {
      this.nav.push(this.pages[item]);
    }
  }

  /**
   * Log out the app
   */
  doLogout(): void {
  }

}
