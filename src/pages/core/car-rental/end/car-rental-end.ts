import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import * as Constants from '../../../../shared/constants';
import { Globals } from '../../../../shared/globals';
import { CarRentalProvider } from '../../../../providers/car-rental';
import { NoleggioDocumentPage } from '../noleggio-document/noleggio-document';

@Component({
  selector: 'page-car-rental-end',
  templateUrl: 'car-rental-end.html',
})
export class CarRentalEndPage {

	tabValues = Constants.END_NOLEGGIO_TAB_VALUES ;

  selectedTab: number = 0;
  checkedTabs = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public globals: Globals,
              private _carRental: CarRentalProvider) {
    // check the first tab when created this modal
    //alert(this.selectedTab);
    this.checkedTabs.push(this.selectedTab);

    console.log('CarRentalEndPage. TIPONOLEGGIO= ' + globals.noleggio.TipoNoleggio);
  }

  ionViewDidLoad() {
    console.log('CarRentalEndPage. ionViewDidLoad');
  }

  handleSelectTab(val): void {
    const value = val.value || val;
    this.selectedTab = value;
    console.log("CarRentalEndPage. SelectedTab: " + this.selectedTab)
    console.log("CarRentalEndPage. this.globals.noleggio: " + this.globals.noleggio);
   
    //TODO: will go to a recap page before save rientro
    if(value==2){  //finalize

      if(!this.checkFineNoleggio())
      {
        let msgErrore = 'Per favore compila tutti i campi richiesti.'
        if((this.globals.rientro.KmEntrata - this.globals.noleggio.KmUscita) <= 0)
        {
          //I km in entrata sono uguali a quelli di uscita: impossibile.
          msgErrore = 'Km rientro inferiori o uguali a km in uscita.';
        }
        this.globals.showToastError(msgErrore);
        return;
      }

      this.globals.showLoading().then(() => {

        this._carRental.end(this.globals.rientro).then((res : any) => {
            console.log("CarRentalEndPage. carRental.end...");
            console.log(res);
            if (res.success) {
              this.globals.showToastSuccess("Noleggio aggiornato con successo!");
              // this._carRental.getNoleggioDocument(this.globals.noleggio.ID).then(res => {
                let nav_params = {
                  NoleggioID: res.data.ID
                }
                this.navCtrl.push(NoleggioDocumentPage, nav_params);
                this.globals.hideLoading();
            }
            else {
              // hide loading spinner
              this.globals.showToastError(res.message);
              this.globals.hideLoading();
            }

          }).catch(err => {
            console.log('CarRentalEndPage. carRental.end -> ERRORE: ' + err);
            // hide loading spinner
            this.globals.hideLoading();
          });

      });

    }
    
    if(this.checkedTabs.indexOf(value) === -1){
      this.checkedTabs.push(value);
    }
    
  }

  /**
   * On clicked back button event to select previous tab
   */
  public handleBackSelect(): void {    
    if (this.selectedTab > 0) {
      this.selectedTab = this.selectedTab - 1;
    }    
    console.log("CarRentalEndPage. Active tab: " + this.selectedTab);    
  }

  checkFineNoleggio() {
    
    let valido: boolean = true;

    //alert(this.globals.rientro.KmEntrata);

    //check tab veicolo
    if(this.globals.rientro.KmEntrata == null || this.globals.rientro.KmEntrata <= 0)
    {
      valido = false;
    }
    if((this.globals.rientro.KmEntrata - this.globals.noleggio.KmUscita) <= 0)
    {
      valido = false;
    }
    if(this.globals.noleggio.TipoNoleggio == 0 && (this.globals.rientro.TariffaGiornata == null && this.globals.rientro.TariffaGiornata < 0))
    {
      valido = false;
    }
    if(this.globals.noleggio.TipoNoleggio == 0 && (this.globals.rientro.KmGiorno == null && this.globals.rientro.KmGiorno < 0))
    {
      valido = false;
    }
    if(this.globals.rientro.CarburanteEntrata == null || this.globals.rientro.CarburanteEntrata < 0)
    {
      valido = false;
    }
          
    return valido;

  }

  annullaNoleggio() {
    this.navCtrl.pop();
  }

}
