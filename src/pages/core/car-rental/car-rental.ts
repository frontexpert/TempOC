import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CarRentalEditPage } from './edit/car-rental-edit';
import { CarRentalEndPage } from './end/car-rental-end';
import { CarRentalProvider } from '../../../providers/car-rental';
import { Globals } from '../../../shared/globals';
import { Noleggio, Sinistri, Rientro } from '../../../models/noleggio';


/**
 * Generated class for the RentalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-car-rental',
  templateUrl: 'car-rental.html',
})
export class CarRentalPage {
  items: any = [];
  _isCleared: boolean = false;
  sinistri : Sinistri[];
  pID: number;      // id of pratica

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private _carRental: CarRentalProvider,
              public globals: Globals) {

                this.pID = this.navParams.get('practicaID');
  }

  ngOnInit() {
    console.log('ngOnInit CarRentalPage');
    //if (this.globals.noleggioCarList.length == 0) {

    //FM: no cache alway refresh data

      // show loading spinner
      this.globals.showLoading().then(() => {
        // load list 
        this._carRental.getNoleggioCarList().then(res => {
          console.log("Noleggio CarList: ", res);
          for(let i = 0; i < this.globals.noleggioCarList.length; i++) {
            let item = {expanded: false};
            this.items.push(item);
          }
          // hide loading spinner
          this.globals.hideLoading();
        }).catch(err => {
          console.log(err);
          // hide loading spinner
          this.globals.hideLoading();
        });
      });
      
    //}
    // else {
    //   for(let i = 0; i < this.globals.noleggioCarList.length; i++) {
    //     let item = {expanded: false};
    //     this.items.push(item);
    //   }
    // }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarRentalPage');
  }

  newCarRental(car, tipo_noleggio) {
    this.globals.noleggio = new Noleggio();
    this.globals.noleggio.ID = 0;
    this.globals.noleggio.TipoNoleggio = tipo_noleggio;
    this.globals.noleggio.VetturaID = car.ID;
    this.globals.noleggio.Vettura = car.Nome;
    this.globals.targaVeicolo = car.Targa;
    this.globals.noleggio.KmUscita = car.Km;
    this.globals.noleggio.KmGiorno = car.KmGiorno;
    this.globals.noleggio.TariffaGiornata = tipo_noleggio == 0 ? car.Tariffa3 : car.Tariffa1;
    this.globals.noleggio.CarburanteUscita = 10;
    this.globals.noleggio.DataConsegna = new Date().toJSON();
    this.globals.noleggio.PraticaID = this.pID == null ? null : this.pID;


    this.globals.showLoading().then(() => {
      // load edit 
      

      this._carRental.getSinistriCarList(car.ID).then(res => {
        console.log("Noleggio sinistri for the car: ", res);
        // hide loading spinner

        this.globals.noleggio.Sinistri = this.globals.noleggioCarSinisti;
        this.globals.hideLoading();
        
        this.navCtrl.push(CarRentalEditPage);
      }).catch(err => {
        console.log(err);
        // hide loading spinner
        this.globals.hideLoading();
      });
    });


  	//this.navCtrl.push(CarRentalEditPage);
  }

  editCarRental(targa: string, noleggio_id: number) {
    this.globals.rientro = null;
    this.globals.showLoading().then(() => {
      this.globals.targaVeicolo = targa;
      // load edit 
      this._carRental.getNoleggioEdit(noleggio_id).then(res => {
        console.log("Noleggio edit: ", res);
        // hide loading spinner
        this.globals.hideLoading();
        this.navCtrl.push(CarRentalEditPage);

      }).catch(err => {
        console.log(err);
        // hide loading spinner
        this.globals.hideLoading();
      });
    });
  }

  endCarRental(targa: string, noleggio_id: number) {
    this.globals.showLoading().then(() => {
      this.globals.targaVeicolo = targa;
      // load edit 
      this._carRental.getNoleggioEdit(noleggio_id).then(res => {
        console.log("Noleggio ends: ", res);
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
        console.log(err);
        // hide loading spinner
        this.globals.hideLoading();
      });
    });
  }


  expandItem(item){

    if (!item.expanded && this._isCleared) {      
      this._isCleared = false;
      return;
    }
 
    this.items.map((listItem) => {      

      if(item == listItem){
          listItem.expanded = !listItem.expanded;
      } else {
          listItem.expanded = false;
      }

      return listItem;

    });

  }

  clearItem() {
    this._isCleared = true;

    this.items.map((listItem) => {
      listItem.expanded = false;

      return listItem;
    });
  }

  convertToLocalDate(ios_date_str: string) {
    let d = new Date(ios_date_str);
    return d.toLocaleDateString();
  }

  carItemHeaderState(car_item: any) {
    let state = 1;
    if (car_item.Prenotazione != null && car_item.Prenotazione != "" && car_item.NoleggioID == null) {
      state = 2;
    }
    else {
      if (car_item.NoleggioID != null) {
        if (car_item.Noleggio.DataConsegna != null && car_item.Noleggio.DataRestituzione == null)
          state = 3;
      }
    }

    return state;
  }

}
