import { Injectable } from '@angular/core';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { Globals } from '../shared/globals';
import { Api } from '../providers/api'
import { Events } from 'ionic-angular';
import * as Constants from '../shared/constants';

@Injectable()
export class InAppBrowserProvider {


    constructor(public iab: InAppBrowser, 
             public globals: Globals, 
             public api : Api,
             public events: Events
              
              ) {
    
                console.log('Hello InAppBrowserProvider Provider');
  }

  openPreventivo(id:number) {

    var close;
    var closeLoop;
    var self = this;
    let options: InAppBrowserOptions = {
      footer: "no",
      location: "no",
      toolbar: "no",
      hardwareback: "no", 
      clearsessioncache: "yes",
      disallowoverscroll: "yes",
      fullscreen: "yes"
    }

    closeLoop = setInterval(function() {
      console.log("settaggioInterval");
      win.executeScript({

        code: "localStorage.getItem('close');"

      }).then( function(values) {
          close = values[0];
          console.log("close=" + close);
          if (close == "true") {
           
            win.executeScript({

              code: "localStorage.setItem('close', 'false');"
              
            });
            console.log('emit event quote-refresh')
            self.events.publish("quote-refresh");
            win.close();
          }
      });
    }, 1000);

    console.log('open');
    //alert(Constants.API_URL);
    const win = this.iab.create(Constants.OXYGEN_URL + '/ApiTablet/' + this.api.username + '/' + this.api.password +'/LoginPraticaPreventivo/?ID='+id , '_blank', options);
    //const win = this.iab.create('http://oxygen2.ilcarrozziere.it/' + '/ApiTablet/' + this.api.username + '/' + this.api.password +'/LoginPraticaPreventivo/?ID='+id , '_blank', options);
    
    if (this.globals.isPhonegap()) {
      win.on('loadstart').subscribe(event => {
        console.log("loadstart -->",event);
      }, err => {
          console.log("InAppBrowser loadstart Event Error: " + err);
          this.globals.showToastError("Errore avvio del browser interno: " + err);
      });

      win.on("exit").subscribe(
        (event) => {
            console.log('ESCO');
            clearInterval(closeLoop);
        },
        (err) => {
            console.log("InAppBrowser Loadstop Event Error: " + err);
            this.globals.showToastError("Errore pausa caricamento browser: " + err);
        }
      );

      win.on('loaderror').subscribe(event => {
        console.log('load error');
        this.globals.showToastError("Errore caricamento");
        console.log (event);
      }); 
      win.on('loadstop').subscribe(event => {
          console.log('LOADSTOP');
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
            code: "(function() { var body = document.querySelector('body'); var button = document.createElement('div'); button.innerHTML = '< Indietro'; button.classList.add('youtube_done_button'); button.onclick = function() { localStorage.setItem('close', 'true');  }; body.appendChild(button); })();"                
          })
   
          
      });
      
      win.show();
    }
  }

  newPreventivo(praticaID: number) {

    let params = {
      PraticaID: praticaID
    };  

    let promise = new Promise((resolve, reject) => {

    this.api.post('PraticaPreventivo/Insert/' + this.api.username + '/' + this.api.password + '/', params).subscribe((res: any) => {
        console.log("PraticaPreventivo/Insert", res);
        if (res.success) {
          resolve(res.data);
        }
        else
          reject(res.message);
      }, (err) => {
        reject(err);
      });
    });

    return promise;

  }

}