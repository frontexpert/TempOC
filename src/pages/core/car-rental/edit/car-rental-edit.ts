import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import * as Constants from '../../../../shared/constants';
import { Globals } from '../../../../shared/globals';
import { CarRentalProvider } from '../../../../providers/car-rental';
import { NoleggioDocumentPage } from '../noleggio-document/noleggio-document';
import { Sinistri } from '../../../../models/noleggio';

@Component({
  selector: 'page-car-rental-edit',
  templateUrl: 'car-rental-edit.html',
})
export class CarRentalEditPage {

	tabValues = Constants.NOLEGGIO_TAB_VALUES;

  selectedTab: number = 0;
  checkedTabs = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public globals: Globals,
              private _carRental: CarRentalProvider) {

  	// check the first tab when created this modal
    this.checkedTabs.push(this.selectedTab);

    if(this.globals.noleggio.FatturazioneNazione == '' || this.globals.noleggio.FatturazioneNazione == null)
    {
      this.globals.noleggio.FatturazioneNazione = "ITALIA";
    }

    if(this.globals.noleggio.AnagraficaResidenzaNazione == '' || this.globals.noleggio.AnagraficaResidenzaNazione == null)
    {
      this.globals.noleggio.AnagraficaResidenzaNazione = "ITALIA";
    }

    if(this.globals.noleggio.Anagrafica2ResidenzaNazione == '' || this.globals.noleggio.Anagrafica2ResidenzaNazione == null)
    {
      this.globals.noleggio.Anagrafica2ResidenzaNazione = "ITALIA";
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarRentalEditPage');
  }

  ngOnInit() {

    if(this.globals.noleggio.ID == 0 && this.globals.noleggio.PraticaID != null)
    {
      this.globals.showLoading().then(() => {
        // load edit 
        

        this._carRental.getClienteDaPratica(this.globals.noleggio.PraticaID).then((res: any) => {
          
          // hide loading spinner
          console.log('RESPONSE DA PRATICA');
          console.log(res);

          //Riempi i campi con i dati del cliente
          if (this.globals.noleggio.TipoNoleggio == 0) {
            this.globals.noleggio.FatturazioneNome = res.data[0].AnagraficaNome;
            this.globals.noleggio.FatturazioneCognome = res.data[0].AnagraficaCognome;
            this.globals.noleggio.FatturazioneEmail = res.data[0].AnagraficaEmail;
            this.globals.noleggio.FatturazioneCellulare = res.data[0].AnagraficaCellulare;
            this.globals.noleggio.FatturazioneDocumento = res.data[0].AnagraficaPatenteCategoria;
            this.globals.noleggio.FatturazioneDocumentoNumero = res.data[0].AnagraficaPatenteNumero;
            this.globals.noleggio.FatturazioneCap = res.data[0].AnagraficaResidenzaCap;
            this.globals.noleggio.FatturazioneIndirizzo = res.data[0].AnagraficaResidenzaIndirizzo;
            this.globals.noleggio.FatturazionePartitaIva = res.data[0].AnagraficaCodiceFiscale;
            this.globals.noleggio.FatturazioneTelefono = res.data[0].AnagraficaTelefono;
            this.globals.noleggio.FatturazioneComune = res.data[0].AnagraficaResidenzaComune;
            this.globals.noleggio.FatturazioneDocumentoRilascioData = res.data[0].AnagraficaPatenteRilascioData;
            this.globals.noleggio.FatturazioneDocumentoRilascioEnte = res.data[0].AnagraficaPatenteRilascioEnte;
            this.globals.noleggio.FatturazioneDocumentoScadenza = res.data[0].AnagraficaPatenteScadenzaData;
            this.globals.noleggio.FatturazioneProvincia = res.data[0].AnagraficaResidenzaProvincia;
            this.globals.noleggio.FatturazioneNazione = res.data[0].AnagraficaResidenzaNazione;
        } else if (this.globals.noleggio.TipoNoleggio == 1) {
            this.globals.noleggio.AnagraficaNome = res.data[0].AnagraficaNome;
            this.globals.noleggio.AnagraficaCognome = res.data[0].AnagraficaCognome;
            this.globals.noleggio.AnagraficaEmail = res.data[0].AnagraficaEmail;
            this.globals.noleggio.AnagraficaCellulare = res.data[0].AnagraficaCellulare;
            this.globals.noleggio.AnagraficaPatenteNumero = res.data[0].AnagraficaPatenteNumero;
            this.globals.noleggio.AnagraficaResidenzaCap = res.data[0].AnagraficaResidenzaCap;
            this.globals.noleggio.AnagraficaResidenzaIndirizzo = res.data[0].AnagraficaResidenzaIndirizzo;
            this.globals.noleggio.AnagraficaCodiceFiscale = res.data[0].AnagraficaCodiceFiscale;
            this.globals.noleggio.AnagraficaTelefono = res.data[0].AnagraficaTelefono;
            this.globals.noleggio.AnagraficaResidenzaComune = res.data[0].AnagraficaResidenzaComune;
            this.globals.noleggio.AnagraficaPatenteRilascioData = res.data[0].AnagraficaPatenteRilascioData;
            this.globals.noleggio.AnagraficaPatenteRilascioEnte = res.data[0].AnagraficaPatenteRilascioEnte;
            this.globals.noleggio.AnagraficaPatenteScadenzaData = res.data[0].AnagraficaPatenteScadenzaData;
            this.globals.noleggio.AnagraficaPatenteCategoria = res.data[0].AnagraficaPatenteCategoria;
            this.globals.noleggio.AnagraficaResidenzaProvincia = res.data[0].AnagraficaResidenzaProvincia;
            this.globals.noleggio.AnagraficaResidenzaNazione = res.data[0].AnagraficaResidenzaNazione;
        }

          this.globals.hideLoading();
          
        }).catch(err => {
          console.log(err);
          // hide loading spinner
          this.globals.hideLoading();
        });
      });
    }

  }

  handleSelectTab(val): void {
    const value = val.value || val;
    this.selectedTab = value;
    console.log(this.selectedTab)
    console.log("this.globals.noleggio", this.globals.noleggio);
   
    //TODO: will go to a recap page before save
    if(value==5){  //save

      //faccio i controlli del caso
      if(!this.checkNoleggio())
      {
        this.globals.showToastError('Per favore compila tutti i campi richiesti.');
        return;
      }

      this.globals.showLoading().then(() => {
               

        if (this.globals.noleggio.ID == 0) {
          //this.globals.noleggio.Sinistri = [];
          // insert 
          this._carRental.add(this.globals.noleggio).then((res: any) => {
            console.log("Noleggio insert: ", res);

            if (res.success && res.data.ID > 0) {
              this.globals.noleggio.ID = res.data.ID;
              this.globals.showToastSuccess("Noleggio inserito con successo!");
              //this._carRental.getNoleggioDocument(res.NoleggioID).then(res => {
                let nav_params = {
                  NoleggioID: res.data.ID
                }

                //Ho finalmente l'id del noleggio, passo a inserire sinistri e immagini
                console.log('ELENCO SINISTRI');
                console.log(this.globals.noleggio.Sinistri);

                let nuoviSinistri : Array<Sinistri> = [];
                nuoviSinistri = this.globals.noleggio.Sinistri.filter(it => {
                  return (it.NoleggioID == 0);
                });

                if(nuoviSinistri.length > 0)
                {
                  for(let i=0; i<nuoviSinistri.length; i++){
                    //Inserisci sinistro e poi le immagini                   
                    if (nuoviSinistri[i].Sinistro != "") {
                      
                          let params = new Sinistri();
                          params.NoleggioID = res.data.ID;
                          params.Sinistro = nuoviSinistri[i].Sinistro;
                          params.VetturaID = this.globals.noleggio.VetturaID;
                          params.SinistroData = new Date().toJSON();
                  
                          this._carRental.addSinistri(params).then((data: any) => {
                              //Salva le foto del sinistro

                              let sinistroId = data.SinistroID;
                             
                              console.log('SINISTRO AGGIUNTO');
                              //inizio immagini
                                if (nuoviSinistri[i].Immagini.length > 0) {
                                        let promises = [];
                                        
                                        for (let j = 0; j < nuoviSinistri[i].Immagini.length; j++) {
                                            //Invio i file per aggiungere l'immagine
                                            promises.push(this._carRental.addSinistriImg(sinistroId, nuoviSinistri[i].Immagini[j].Url));
                                        }
                                        Promise.all(promises).then((values: any[]) => {
                                            console.log('add photo success: ', values);
                                            this.globals.hideLoading();
                                            this.navCtrl.push(NoleggioDocumentPage, nav_params);
                                            
                                            
                                        }).catch(err => {
                                            console.log('ERROR: ', err);
                                            alert('ERRORE INSERIMENTO SINISTRO=' + err);
                                            this.globals.hideLoading();
                                        });;
                                    
                                }
                          }).catch(err => {
                              console.log(err);
                              this.globals.hideLoading();
                          });
                  }
                  console.log('NOLEGGIO SALVATO CON SUCCESSO... CON SINISTRI, IMMAGINI E TUTTO');
                    //console.log(nuoviSinistri[i].Sinistro);
                  }
                } else {
                  this.globals.hideLoading();
                  this.navCtrl.push(NoleggioDocumentPage, nav_params);
                }
            }
            else {
              // hide loading spinner
              this.globals.showToastError(res.message);
              this.globals.hideLoading();
            }

          }).catch(err => {
            console.log(err);
          });

        } else {
          // let nav_params = {
          //   document: {
          //     ThumbUrl: "xxxx",
          //     Url: "yyy"
          //   }
          // }
          // this.navCtrl.push(NoleggioDocumentPage, nav_params);
          // this.globals.hideLoading();
          //this.globals.noleggio.Sinistri = [];
          // update
          this._carRental.update(this.globals.noleggio).then((res : any) => {
            console.log("Noleggio update: ", res);
            if (res.success) {
              this.globals.showToastSuccess("Noleggio aggiornato con successo!");
              //this._carRental.getNoleggioDocument(this.globals.noleggio.ID).then(res => {
                let nav_params = {
                  NoleggioID: this.globals.noleggio.ID
                }
                this.globals.hideLoading();
                this.navCtrl.push(NoleggioDocumentPage, nav_params);
               
              //}).catch(err => {
              //  console.log(err);
              //  this.globals.hideLoading();
              //});
            }
            else {
              // hide loading spinner
              this.globals.showToastError('ERRORE: ' + res.message);
              this.globals.hideLoading();
            }

          }).catch(err => {
            console.log(err);
            // hide loading spinner
            this.globals.showToastError('ERRORE: ' + err);
            this.globals.hideLoading();
          });
        }

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
    console.log("Active tab", this.selectedTab);    
  }

  checkNoleggio() {
    
    let valido: boolean = true;

    //check tab veicolo
    if(this.globals.noleggio.FatturazioneNome == '' || this.globals.noleggio.FatturazioneNome == null)
    {
      valido = false;
    }
    if(this.globals.noleggio.FatturazioneCognome == '' || this.globals.noleggio.FatturazioneCognome == null)
    {
      valido = false;
    }
    if(this.globals.noleggio.FatturazioneIndirizzo == '' || this.globals.noleggio.FatturazioneIndirizzo == null)
    {
      valido = false;
    }
    if(this.globals.noleggio.FatturazioneCap == '' || this.globals.noleggio.FatturazioneCap == null)
    {
      valido = false;
    }
    if(this.globals.noleggio.FatturazioneProvincia == '' || this.globals.noleggio.FatturazioneProvincia == null)
    {
      valido = false;
    }

    if(this.globals.noleggio.FatturazioneNazione == '' || this.globals.noleggio.FatturazioneNazione == null)
    {
        valido = false;
    }

    if(this.globals.noleggio.FatturazioneDocumento == '' || this.globals.noleggio.FatturazioneDocumento == null)
    {
      valido = false;
    }
    if(this.globals.noleggio.FatturazioneDocumentoScadenza == '' || this.globals.noleggio.FatturazioneDocumentoScadenza == null)
    {
      valido = false;
    }
    if(this.globals.noleggio.AnagraficaNome == '' || this.globals.noleggio.AnagraficaNome == null)
    {
      valido = false;
    }
    if(this.globals.noleggio.AnagraficaCognome == '' || this.globals.noleggio.AnagraficaCognome == null)
    {
      valido = false;
    }
    if(this.globals.noleggio.AnagraficaResidenzaIndirizzo == '' || this.globals.noleggio.AnagraficaResidenzaIndirizzo == null)
    {
      valido = false;
    }

    if(this.globals.noleggio.AnagraficaResidenzaCap == '' || this.globals.noleggio.AnagraficaResidenzaCap == null)
    {
        valido = false;
    }

    if(this.globals.noleggio.AnagraficaResidenzaProvincia == '' || this.globals.noleggio.AnagraficaResidenzaProvincia == null)
    {
        valido = false;
    }

    if(this.globals.noleggio.AnagraficaResidenzaComune == '' || this.globals.noleggio.AnagraficaResidenzaComune == null)
    {
        valido = false;
    }

    if(this.globals.noleggio.AnagraficaResidenzaNazione == '' || this.globals.noleggio.AnagraficaResidenzaNazione == null)
    {
        valido = false;
    }

    if(this.globals.noleggio.AnagraficaPatenteCategoria == '' || this.globals.noleggio.AnagraficaPatenteCategoria == null)
    {
        valido = false;
    }

    if(this.globals.noleggio.AnagraficaPatenteScadenzaData == '' || this.globals.noleggio.AnagraficaPatenteScadenzaData == null)
    {
        valido = false;
    }

    if(this.globals.noleggio.DataConsegna == '' || this.globals.noleggio.DataConsegna == null)
    {
        valido = false;
    }

    if(this.globals.noleggio.KmGiorno == null)
    {
        valido = false;
    }

    if(this.globals.noleggio.KmUscita == null)
    {
        valido = false;
    }

    if(this.globals.noleggio.CarburanteUscita == null)
    {
        valido = false;
    }
          
    return valido;

  }

  annullaNoleggio() {
    this.navCtrl.pop();
  }

}
