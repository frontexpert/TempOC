import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';

import { PracticesPage } from './practices/practices';
import { TemparioPage } from './tempario/tempario';
import { RentalPage } from './rental/rental';
import { ApertePage } from './aperte/aperte';

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
  rootPage = ApertePage;

  pages = {
    'aperte': ApertePage,
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
      // let options: InAppBrowserOptions = {
      //   footer: "no",
      //   toolbarposition: "top"
      // }
      //const browser = this.iab.create('http://oxygen2.ilcarrozziere.it', '_blank', options);
      //browser.show();
      this.openInAppBrowser();
    }
    else {
      this.nav.push(this.pages[item]);
    }
  }

  openInAppBrowser() {
    var close;
    var closeLoop;
    let options: InAppBrowserOptions = {
      footer: "no",
      location: "no",
      toolbar: "no"
    }
    
    const win = this.iab.create('http://www.sitesolutions.it', '_blank', options);
 
    win.on('loaderror').subscribe(event => {
      console.log('load error');
      alert('load error');
      console.log (event);
    }); 
    win.on('loadstop').subscribe(event => {
        //injecting the CSS
        win.insertCSS({
          code: ".youtube_done_button { position: fixed; bottom: 0; width: 100%; background: rgba(0, 0, 0, 0.8); color: #2196F3; padding: 10px; font-size: 20px;}"   
        });
  
 
        //setting close to false when the InAppBrowser is opened
        win.executeScript({
          code: "localStorage.setItem('close', 'false');"
        });

        //creating and attaching a button with click listener to the opened page
        win.executeScript({
          code: "(function() { var body = document.querySelector('body'); var button = document.createElement('div'); button.innerHTML = 'Done'; button.classList.add('youtube_done_button'); button.onclick = function() { localStorage.setItem('close', 'true');  }; body.appendChild(button); })();"                
        });
 
        closeLoop = setInterval(function() {
          win.executeScript({

            code: "localStorage.getItem('close');"

          }).then( function(values) {
              close = values[0];
              console.log("close=" + close);
              if (close == "true") {
                  clearInterval(closeLoop);
                  win.close();
              }
          });
        }, 1000);
    });
    win.show();
  }
  
  /**
   * Log out the app
   */
  doLogout(): void {
  }

}
