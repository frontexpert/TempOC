import { Injectable } from '@angular/core';
import { Api } from './api';
import { Globals } from '../shared/globals';

/*
  Generated class for the PracticesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PracticesProvider {

  public aperte_list: Array<any> = [];

  public lavorazione_list: Array<any> = [];

  public chiuse_list: Array<any> = [];

  constructor(public api: Api, public globals : Globals) {
    console.log('PracticesProvider');
  }

  /**
   * Get pratica list
   * @param pageNumber index of page
   * @param pageSize size of page
   * @return {Promise}
   */
  get(pageNumber: number, pageSize: number = 50) {
    let promise = new Promise((resolve, reject) => {
      let params = {
        Page: pageNumber,
        Pagesize: pageSize
      };

      //recupera username e password da api
      let us = this.api.username;
      let pwd = this.api.password;

      this.api.get('Pratica/List/' + this.api.username + '/' + this.api.password + '/', params).subscribe((res: any) => {
          if (res.success) {
          console.log('Pratica/List/');
          console.log(res.data);
          if (this.chiuse_list.length == 0) this.filterPraticaList(res.data);
          resolve(res.data);
        }
        else
          resolve(res);
      }, (err) => {
        console.log('get Pratica/List error', err);
        reject(err);
      });
    });

    return promise;
  }

  /**
   * Get all pratica list
   * @return {Promise}
   */
  getAllPratices() {
    let promise = new Promise((resolve, reject) => {
      this.api.get('Pratica/List/' + this.api.username + '/' + this.api.password + '/').subscribe((res: any) => {
        if (res.success) {
          //console.log('TUTTE');
          //console.log(res.data);
          this.globals.praticaList = res.data;
          this.filterPraticaList(res.data);
          resolve(res.data);
        }
        else
          resolve(res);
      }, (err) => {
        console.log('getAll Pratica/List error', err);
        reject(err);
      });
    });

    return promise;
  }

  /**
   * Get a pratica details by id
   * @param id pratica id
   * @return {Promise}
   */
  getDetails(id: number) {
    let params = {
      ID: id
    };

    let promise = new Promise((resolve, reject) => {
      this.api.get('Pratica/Details/' + this.api.username + '/' + this.api.password + '/', params).subscribe((res: any) => {
        if (res.success) {
          resolve(res.data);
        }
        else
          resolve(res);
      }, (err) => {
        console.log('Pratica/Details error', err);
        reject(err);
      });        
    });

    return promise;
  }

  /**
   * Get a pratica details by id
   * @param id pratica id
   * @return {Promise}
   */
  getPaymentDetails(id: number) {
    let params = {
      ID: id
    };

    let promise = new Promise((resolve, reject) => {
      this.api.get('PraticaPagamento/Details/' + this.api.username + '/' + this.api.password + '/', params).subscribe((res: any) => {
        if (res.success) {
          resolve(res.data);
        }
        else
          resolve(res);
      }, (err) => {
        console.log('PraticaPagamento/Details error', err);
        reject(err);
      });
    });

    return promise;
  }  

  /**
   * Get practice quote list
   * @param id id of practice
   */
  getQuoteList(id: number) {
    let params = {
      PraticaID: id
    };

    let promise = new Promise((resolve, reject) => {
      this.api.get('PraticaPreventivo/List/' + this.api.username + '/' + this.api.password + '/', params).subscribe((res: any) => {
        if (res.success) {
          resolve(res.data);
        }
        else
          resolve(res);
      }, (err) => {
        console.log('PraticaPreventivo/List error', err);
        reject(err);
      });
    });

    return promise;
  }

  getQuote(id: number, praticaId: number) {
    let params = {
      ID: id,
      PraticaID: praticaId
    };

    let promise = new Promise((resolve, reject) => {
      this.api.get('PraticaPreventivo/List/' + this.api.username + '/' + this.api.password + '/', params).subscribe((res: any) => {
        if (res.success) {
          resolve(res.data);
        }
        else
          resolve(res);
      }, (err) => {
        console.log('PraticaPreventivo/List error', err);
        reject(err);
      });
    });

    return promise;
  }

  getMarcaModelloVersione(id: number) {
    let params = {
      ID: id
    };

    let promise = new Promise((resolve, reject) => {
      this.api.get('Pratica/GetMarcaModelloVersione/' + this.api.username + '/' + this.api.password + '/', params).subscribe((res: any) => {
        if (res.success) {
          resolve(res.data);
        }
        else
          resolve(res);
      }, (err) => {
        console.log('Pratica/GetMarcaModelloVersione error', err);
        reject(err);
      });
    });

    return promise;
  }

  /**
   * Send a POST request to Pratica Insert
   * @param body
   */
  post(body: any) {    
    let promise = new Promise((resolve, reject) => {
      this.api.post('Pratica/Insert/' + this.api.username + '/' + this.api.password + '/', body).subscribe((res: any) => {
        if (res.success) {
          resolve(res.data);
        }
        else
          resolve(res);
      }, (err) => {
        console.log('Pratica/Insert error', err);
        reject(err);
      });
    });

    return promise;
  }

  /**
   * classify the full pratica list response data into three classes(by state)
   * @param {Array<any>} pratica_list [description]
   */
  private filterPraticaList(pratica_list: Array<any>) {
    console.log('tutte', pratica_list);
    if (pratica_list.length > 0) {
      this.aperte_list = pratica_list.filter(item => {
        return item.StatoMacroID == 1;
      });      
      console.log('aperte_list', this.aperte_list)

      this.lavorazione_list = pratica_list.filter(item => {
        return item.StatoMacroID == 2;
      });
      console.log('lavorazione_list', this.lavorazione_list)

      this.chiuse_list = pratica_list.filter(item => {
        return item.StatoMacroID == 3;
      });
      console.log('chiuse_list', this.chiuse_list)
    }
  }

  /**
   * Send a GET request to get pratica details for edit
   * @param  {number}       id pratica id
   * @return {Promise<any>}    HTTP response
   */
  getEditDetails(id: number): Promise<any> {
    let params = {
      ID: id
    };

    let promise = new Promise((resolve, reject) => {
      console.log("pratica id: ", id);
      console.log("url: ", 'http://tablet.oxygencar.it/Pratica/Edit/' + this.api.username + '/' + this.api.password + '/');
      this.api.get('Pratica/Edit/' + this.api.username + '/' + this.api.password + '/', params).subscribe((res: any) => {
        console.log("tablet.oxygencar.it/Pratica/Edit res: ", res);
        if (res.success) {
          resolve(res.data);
        }
        else
          reject(res);
      }, (err) => {
        console.log("tablet.oxygencar.it/Pratica/Edit - Error: ", err);
        reject(err);
      });
    });

    return promise;
  }

 /**
   * Send a GET request to get pratica details for prefill insert fields, starting from targa 
   * @param  {string}       targa
   * @return {Promise<any>}    HTTP response
   */
  getInsertDetailsFromTarga(targa): Promise<any> {
    let params = {
      P1_Targa: targa
    };

    let promise = new Promise((resolve, reject) => {
      console.log("targa: ", targa);
      console.log("url: ", 'http://tablet.oxygencar.it/Pratica/CreateFromTarga/' + this.api.username + '/' + this.api.password + '/');
      this.api.get('Pratica/CreateFromTarga/' + this.api.username + '/' + this.api.password + '/', params).subscribe((res: any) => {
        console.log("success res: ", res);
        if (res.success) {
          resolve(res.data);
        }
        else
          reject(res);
      }, (err) => {
        console.log("tablet.oxygencar.it/Pratica/CreateFromTarga - Error: ", err);
        reject(err);
      });
    });

    return promise;
  }

  createFromNoleggio(targa: string, noleggioID: number): Promise<any> {
    let body = {
      ID: noleggioID,
      Targa: targa
    }
    let promise = new Promise((resolve, reject) => {
      this.api.post('Pratica/CreateFromNoleggio/' + this.api.username + '/' + this.api.password + '/', body).subscribe((res: any) => {
        if (res.success) {
          resolve(res.data);
        }
        else
          resolve(res);
      }, (err) => {
        console.log('Pratica/CreateFromNoleggio', err);
        reject(err);
      });
    });

    return promise;
  }

  /**
   * Sent a POST request to update pratica
   * @param  {any}          body Fields  in  request
   * @return {Promise<any>}      [description]
   */
  update(body: any): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this.api.post('Pratica/Update/' + this.api.username + '/' + this.api.password + '/', body).subscribe((res: any) => {
        console.log('RISPOSTA UPDATE:' + res.success);
        console.log('RISPOSTA UPDATE:' + res.message);
        if (res.success) {
          resolve(res.data);
        }
        else
          resolve(res);
      }, (err) => {
        console.log('Pratica/Update', err);
        reject(err);
      });
    });

    return promise;
  }

  updateMarcaModelloVersione(praticaID: number, marcaId: number, modelloId: number, versioneId: number): Promise<any> {
    let body = {
      ID: praticaID,
      MarcaId: marcaId,
      ModelloId: modelloId,
      VersioneId: versioneId
    }
    let promise = new Promise((resolve, reject) => {
      this.api.post('Pratica/UpdateMarcaModelloVersione/' + this.api.username + '/' + this.api.password + '/', body).subscribe((res: any) => {
        if (res.success) {
          resolve(res);
        }
        else
          resolve(res);
      }, (err) => {
        console.log('Pratica/UpdateMarcaModelloVersione', err);
        reject(err);
      });
    });

    return promise;
  }

  printPreview(ID: number, tipo: number) {
    let promise = new Promise((resolve, reject) => {
      let body = {
        ID: ID,
        TipoStampa: tipo
      }
      this.api.post('PraticaPreventivo/Print/' + this.api.username + '/' + this.api.password + '/', body).subscribe((res: any) => {
        console.log("get dati preventivo");
        console.log(res);
        if (res.success) {
      
          resolve(res.data);
        }
        else
        this.globals.showToastError("ERRORE ANTEPRIMA DI STAMPA");
          resolve(res);
      }, (err) => {
        console.log('PraticaPreventivo/Print', err);
        reject(err);
      });
    });

    return promise;
  }

  getListaGaranti(): Promise<any> {
    let params = {
      
    };

    let promise = new Promise((resolve, reject) => {
      console.log("url: ", 'http://tablet.oxygencar.it/Pratica/JsonGaranteSelezioneList/' + this.api.username + '/' + this.api.password + '/');
      this.api.get('Pratica/JsonGaranteSelezioneList/' + this.api.username + '/' + this.api.password + '/', params).subscribe((res: any) => {
        console.log("success res: ", res);
        if (res.success) {
          resolve(res.data);
        }
        else
          reject(res);
      }, (err) => {
        console.log("tablet.oxygencar.it/Pratica/JsonGaranteSelezioneList - Error: ", err);
        reject(err);
      });
    });

    return promise;
  }

  assegnaGarante(praticaID: number, garanteId: number): Promise<any> {
    let body = {
      ID: praticaID,
      GaranteID: garanteId
    }
    let promise = new Promise((resolve, reject) => {
      this.api.post('Pratica/UpdateAssignGaranteAuto/' + this.api.username + '/' + this.api.password + '/', body).subscribe((res: any) => {
        if (res.success) {
          resolve(res);
        }
        else
          resolve(res);
      }, (err) => {
        console.log('Pratica/UpdateAssignGaranteAuto', err);
        reject(err);
      });
    });

    return promise;
  }

  updateGaranteAutogestione(praticaID: number, garanteAutogestione: boolean): Promise<any> {
    let body = {
      ID: praticaID,
      GaranteAutoGestione: garanteAutogestione
    }
    let promise = new Promise((resolve, reject) => {
      this.api.post('Pratica/UpdateGaranteAutoGestione/' + this.api.username + '/' + this.api.password + '/', body).subscribe((res: any) => {
        if (res.success) {
          resolve(res);
        }
        else
          resolve(res);
      }, (err) => {
        console.log('Pratica/UpdateGaranteAutoGestione', err);
        reject(err);
      });
    });

    return promise;
  }

  getDetailsAutogestita(id: number) {
    let params = {
      ID: id
    };

    let promise = new Promise((resolve, reject) => {
      this.api.get('Pratica/DettagliPraticaAutonoma/' + this.api.username + '/' + this.api.password + '/', params).subscribe((res: any) => {
        if (res.success) {
          resolve(res.data);
        }
        else
          resolve(res);
      }, (err) => {
        console.log('Pratica/DettagliPraticaAutonoma error', err);
        reject(err);
      });        
    });

    return promise;
  }

  updateDatiAutogestione(praticaID: number, dettagli: any): Promise<any> {
    let body = {
      ID: praticaID,
      DataInvioPec: dettagli.DataInvioPec, 
      DataTermineLiquidazione: dettagli.DataTermineLiquidazione, 
      DataLiquidazioneParziale: dettagli.DataLiquidazioneParziale, 
      DataLiquidazioneCompletata: dettagli.DataLiquidazioneCompletata
    }
    let promise = new Promise((resolve, reject) => {
      this.api.post('Pratica/UpdateDatiAutogestione/' + this.api.username + '/' + this.api.password + '/', body).subscribe((res: any) => {
        if (res.success) {
          resolve(res);
        }
        else
          resolve(res);
      }, (err) => {
        console.log('Pratica/UpdateGaranteAutoGestione', err);
        reject(err);
      });
    });

    return promise;
  }

}
