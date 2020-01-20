import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CarRentalPage } from '../../../car-rental/car-rental';
import { CarRentalEditPage } from '../../../car-rental/edit/car-rental-edit';
import { CarRentalEndPage } from '../../../car-rental/end/car-rental-end';
import { PdfPreviewPage } from '../../../shared/pdf-preview/pdf-preview';
import { RentDocumentItem } from '../../../../../models/rentDocument';
import { Noleggio, Rientro } from '../../../../../models/noleggio';
import { CarRentalProvider } from '../../../../../providers/car-rental';
import { Globals } from '../../../../../shared/globals';

@Component({
  selector: 'rent-tab',
  templateUrl: 'rent-tab.html'
})
export class RentTabComponet {

  

  @Input() rentals: any[] = [];
  @Input() practicaID: number;

  // pie
  colorScheme = {
    domain: ['#ff8ba4', '#86c7f3', '#ffe29a', '#AAAAAA']
  };
  showLabels = false;
  explodeSlices = false;
  doughnut = false;
  view: any[] = [120, 120];

  /*single = [
    {
      "name": "Germany",
      "value": 8940000
    },
    {
      "name": "USA",
      "value": 5000000
    },
    {
      "name": "France",
      "value": 7200000
    }
  ];*/

  constructor(public navCtrl: NavController, private _carRental: CarRentalProvider, public globals: Globals) {
    
  }

  newDaPratica() {
    this.navCtrl.push(CarRentalPage, {
      practicaID: this.practicaID
    });
  }

  onSelect(event) {
    console.log('RentTabComponet:');
    console.log(event);
  }

  showDocumentDetails(noleggio: Noleggio, tipo: number): void {

    let document: RentDocumentItem;
    let nomeDoc: string;
    let tipoID: number;
    let url: string;
    let thumbUrl: string;

    if(tipo == 0)
    {
      nomeDoc = "LETTERA NOLEGGIO CONSEGNA";
      url = noleggio.LetteraNoleggioConsegnaUrl;
      thumbUrl = noleggio.LetteraNoleggioConsegnaThumbUrl;
     
    } else if(tipo == 1)
    {
      nomeDoc = "LETTERA NOLEGGIO RIENTRO";
      tipoID = 101;
      url = noleggio.LetteraNoleggioRientroUrl;
      thumbUrl = noleggio.LetteraNoleggioRientroThumbUrl;
    }

    if(noleggio.Documenti != null)
    {
      for (let documento of noleggio.Documenti) {
        if(documento.Nome == nomeDoc)
        {
          document = documento;
        }
        //console.log(entry); // 1, "string", false
      }

      document.TipoId = tipoID;
      document.Url = url;
      document.Thumb = thumbUrl;
      
    }
    this.navCtrl.push(PdfPreviewPage, {document: document, rentTab: true});

  }

  editCarRental(noleggio_id: number) {
    this.globals.showLoading().then(() => {
      // load edit 
      this._carRental.getNoleggioEdit(noleggio_id).then(res => {
        console.log("RentTabComponet. Noleggio edit: ", res);
        // hide loading spinner
        this.globals.hideLoading();
        this.navCtrl.push(CarRentalEditPage);

      }).catch(err => {
        console.log('RentTabComponet. getNoleggioEdit, ERROR: ', err);
        // hide loading spinner
        this.globals.hideLoading();
      });
    });
  }

  endCarRental(noleggio_id) {
    this.globals.showLoading().then(() => {
      // load edit 
      this._carRental.getNoleggioEdit(noleggio_id).then(res => {
        console.log("RentTabComponet. Noleggio ends: ", res);
        this.globals.rientro = new Rientro();
        this.globals.rientro.ID = this.globals.noleggio.ID;
        this.globals.rientro.DataRestituzione = new Date().toJSON();
        this.globals.rientro.KmGiorno = this.globals.noleggio.KmGiorno;
        this.globals.rientro.CarburanteEntrata = this.globals.noleggio.CarburanteUscita;
        this.globals.rientro.KmEntrata = this.globals.noleggio.KmUscita;
        this.globals.rientro.TariffaGiornata = this.globals.noleggio.TariffaGiornata;
        this.globals.rientro.Note = this.globals.noleggio.Note;
        // hide loading spinner
        this.globals.hideLoading();
        this.navCtrl.push(CarRentalEndPage);

      }).catch(err => {
        console.log('RentTabComponet. getNoleggioEdit, ERROR: ', err);
        // hide loading spinner
        this.globals.hideLoading();
      });
    });
  }

}