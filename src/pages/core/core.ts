import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CorePage');
  }

  onSidebarNavigate(item) {
    this.nav.push(this.pages[item]);
  }

  /**
   * Log out the app
   */
  doLogout(): void {
  }

}
