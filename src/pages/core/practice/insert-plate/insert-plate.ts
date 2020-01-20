import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { InsertPracticePage } from '../insert-practice/insert-practice';
import { NgForm } from '@angular/forms';
import { GeneralProvider } from '../../../../providers/general';
import { ApertePage } from '../../aperte/aperte';

@IonicPage()
@Component({
  selector: 'page-insert-plate',
  templateUrl: 'insert-plate.html',
})
export class InsertPlatePage {

  license_plate: string = "";

  constructor(public navCtrl: NavController, private generalProvider: GeneralProvider, private alert: AlertController) {
  }

  nextPage(form: NgForm) {
    console.log(form);
    if (this.license_plate) {
      this.generalProvider.getVeicolo(this.license_plate).then((res: any) => {
        console.log('InsertPlatePage. generalProvider.getVeicolo');
        console.log(res);
        if (res.length > 0) { //veicolo already in DB
          console.log('veicolo found from targa');
          let veicolo = res[0];
          let DataImmatricolazione = '';
          if (veicolo.DataImmatricolazione) { //check if is date
            let imm = new Date(veicolo.DataImmatricolazione);
            DataImmatricolazione = imm.getDate() + "/" + imm.getMonth() + "/" + imm.getFullYear();
          }
          let confirm = this.alert.create({
            title: 'TARGA GIA\' PRESENTE',
            message: `Il veicolo targato ${veicolo.Targa} è già stato<br/>
            inserito in precedenza.<br/>
            <br/>
            ${veicolo.Marca} ${veicolo.Modello} del ${DataImmatricolazione}<br/>
            di proprietà di ${veicolo.Cognome} ${veicolo.Nome} ${veicolo.RagioneSociale != null ? veicolo.RagioneSociale : ''}<br/>`,
            buttons: [
              {
                text: 'Nuova Anagrafica',
                role: 'cancel',
                handler: () => {
                  console.log('Nuova Anagrafica clicked');
                  this.navCtrl.push(InsertPracticePage, {
                    Targa: this.license_plate,
                    usePrevious: false
                  });
                }
              },
              {
                text: 'Utilizza Anagrafica',
                handler: () => {
                  console.log('Usa Anagrafica clicked');
                  this.navCtrl.push(InsertPracticePage, {
                    Targa: this.license_plate,
                    usePrevious: true
                  });
                }
              }
            ]
          });
          confirm.present();

        } else {
          console.log('it\'s a new targa');
          this.navCtrl.push(InsertPracticePage, { Targa: this.license_plate });
        }
      });
    } else {
      console.log('no targa specified');
      this.navCtrl.push(InsertPracticePage);
    }



  }

  tornaAPratiche() {
    this.navCtrl.push(ApertePage);
  }

}