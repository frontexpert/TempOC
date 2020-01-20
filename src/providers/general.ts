import { Injectable } from '@angular/core';
import { Api } from './api';

@Injectable()
export class GeneralProvider {
  private _options: any;
  private _comune: any[] = [];
  private _countries: any[] = [];
  private _veicoli: any[] = [];

	constructor(public api: Api) {
    console.log('Hello GeneralProvider Provider');
  } 

  /**
   * Drow-down  calls  (populate  dropdowns  in  the  Insert  Views)
   * 1-Insert  options
   * @param tipoID id of tipo
   */
  getOptions(tipoID: number) {
    let promise = new Promise((resolve, reject) => {
      if (this._options != null && this._options.TipoID == tipoID) {
        resolve(this._options);
        return;
      } 

      let params = {
        TipoID: tipoID
      };
    
      this.api.get('Pratica/GetOptions/' + this.api.username + '/' + this.api.password + '/', params).subscribe((res: any) => {
        if (res.success) {
          this._options = res.data;
          resolve(res.data);
        }
        else
          resolve(res);
      }, (err) => {
        reject(err);
      });
    });

    return promise;
  }

  /**
   * Drow-down  calls  (populate  dropdowns  in  the  Insert  Views)
   * 1-City  Selection
   */
  getComune() {
    let promise = new Promise((resolve, reject) => {
      if (this._comune.length > 0) {
        resolve(this._comune);
        return;
      } 

      this.api.get('Pratica/GetComune/' + this.api.username + '/' + this.api.password + '/').subscribe((res: any) => {
        if (res.success) {
          this._comune = res.data;
          resolve(res.data);
        }
        else
          resolve(res);
      }, (err) => {
        reject(err);
      });
    });

    return promise;
  }

  /**
   * Drow-down  calls  (populate  dropdowns  in  the  Insert  Views)
   * 3-Country  Selection
   */
  getCountry() {
    let promise = new Promise((resolve, reject) => {
      if (this._countries.length > 0) {
        resolve(this._countries);
        return;
      } 

      this.api.get('Pratica/GetCountry/' + this.api.username + '/' + this.api.password + '/').subscribe((res: any) => {
        if (res.success) {
          this._countries = res.data;
          resolve(res.data);
        }
        else
          resolve(res);
      }, (err) => {
        reject(err);
      });
    });

    return promise;
  }

/**
   * Check veicolo by targa  (used when insert new pratica)

   */
  getVeicolo(targa) {
    let promise = new Promise((resolve, reject) => {
      let params = {
        Targa: targa
      };

      this.api.get('VeicoloAnagrafica/List/' + this.api.username + '/' + this.api.password + '/', params).subscribe((res: any) => {
        if (res.success) {
          resolve(res.data);
        }
        else
          resolve(res);
      }, (err) => {
        reject(err);
      });
    });

    return promise;
  }  

  callTargaService(targa: string, tipoVeicolo: number) {
    let promise = new Promise((resolve, reject) => {
      let params = {
        Targa: targa,
        TipoVeicolo: tipoVeicolo
      };

      this.api.get('VeicoloAnagrafica/TargaGet/' + this.api.username + '/' + this.api.password + '/', params).subscribe((res: any) => {
        if (res.success) {
          resolve(res.data);
        }
        else
          resolve(res);
      }, (err) => {
        reject(err);
      });
    });

    return promise;
  }  

  getAnagrafica(cognome: string) {
    let paramns = {
      cognome
    };
    let promise = new Promise((resolve, reject) => {

      this.api.get('Noleggio/ListaClienti/' + this.api.username + '/' + this.api.password + '/', paramns).subscribe((res: any) => {
        if (res.success) {
          //this._anagrafiche = res.data;
          resolve(res.data);
        }
        else
          resolve(res);
      }, (err) => {
        reject(err);
      });
    });

    return promise;
  }

  getMarca() {
    let paramns = {
      Uesse: true,
      CostruttoreVeicolo: true,
      Page: 0,
      PageSize: 999999
    };
    let promise = new Promise((resolve, reject) => {

      this.api.get('PraticaPreventivo/GetVeicoloMarcaList/' + this.api.username + '/' + this.api.password + '/', paramns).subscribe((res: any) => {
        if (res.success) {
          //this._anagrafiche = res.data;
          resolve(res.data);
        }
        else
          resolve(res);
      }, (err) => {
        reject(err);
      });
    });

    return promise;
  }

  getModello(marcaId: number, tipologiaVeicolo: number) {
    let paramns = {
      Page: 0,
      PageSize: 999999,
      MarcaID: marcaId,
      TipoVeicoloID: tipologiaVeicolo
    };

    
    let promise = new Promise((resolve, reject) => {

      this.api.get('PraticaPreventivo/GetVeicoloModelloList/' + this.api.username + '/' + this.api.password + '/', paramns).subscribe((res: any) => {
        if (res.success) {
          //this._anagrafiche = res.data;
          resolve(res.data);
        }
        else
          resolve(res);
      }, (err) => {
        reject(err);
      });
    });

    return promise;
  }

  getVersione(modelloId: number) {
    let paramns = {
      Page: 0,
      PageSize: 999999,
      ModelloID: modelloId
    };
    
    let promise = new Promise((resolve, reject) => {

      this.api.get('PraticaPreventivo/GetVeicoloVersioneList/' + this.api.username + '/' + this.api.password + '/', paramns).subscribe((res: any) => {
        if (res.success) {
          //this._anagrafiche = res.data;
          resolve(res.data);
        }
        else
          resolve(res);
      }, (err) => {
        reject(err);
      });
    });

    return promise;
  }

}
