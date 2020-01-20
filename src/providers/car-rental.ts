import { Injectable } from '@angular/core';
import { Api } from './api';
import { Globals } from '../shared/globals';
import { Noleggio, Sinistri, Rientro } from '../models/noleggio';

@Injectable()
export class CarRentalProvider {
	constructor(public api: Api,
              public globals: Globals) {
    console.log('Hello CarRentalProvider Provider');
  } 

  /**
   * Get practice noleggio list
   * @param id id of practice
   * @param page index of page. default is 0
   * @param pageSize count of a page. default is 10
   */
  getNoleggioList(id: number, page: number = 0, pageSize: number = 10) {
    let params = {
      PraticaID: id,
      Page: page,
      PageSize: pageSize
    };

    let promise = new Promise((resolve, reject) => {
      this.api.get('Noleggio/List/' + this.api.username + '/' + this.api.password + '/', params).subscribe((res: any) => {
        if (res.success) {
          resolve(res.data);
        }
        else
          reject(res);
      }, (err) => {
        reject(err);
      });
    });

    return promise;
  }

  /**
   * Get noleggio car list
   * @param page index of page. default is 0
   * @param pageSize count of a page. default is 10
   */
  getNoleggioCarList(page: number = 1, pageSize: number = 10) {
    let params = {
      Page: page,
      PageSize: pageSize
    };

    let promise = new Promise((resolve, reject) => {
      this.api.get('Noleggio/CarList/' + this.api.username + '/' + this.api.password + '/', params).subscribe((res: any) => {
        if (res.success) {
          this.globals.noleggioCarList = res.data;
          resolve(res.data);
        }
        else
          reject(res);
      }, (err) => {
        reject(err);
      });
    });

    return promise;
  }

  getNoleggioEdit(ID: number){
    let params = {
      ID
    };   
    let promise = new Promise((resolve, reject) => {
      this.api.get('Noleggio/Edit/' + this.api.username + '/' + this.api.password + '/', params).subscribe((res: any) => {
        if (res.success) {
          this.globals.noleggio = res.data;
          resolve(res.data);
        }
        else
          reject(res);
      }, (err) => {
        reject(err);
      });
    });

    return promise;

  }

  update(noleggio: Noleggio){
    let body = {
      noleggio
    };   
    let promise = new Promise((resolve, reject) => {
      this.api.post('Noleggio/Update/' + this.api.username + '/' + this.api.password + '/', body).subscribe((res: any) => {
        if (res.success) {
          resolve(res);
        }
        else
          reject(res);
      }, (err) => {
        reject(err);
      });
    });

    return promise;

  }

  updatePraticaAssociata(id: number, praticaID: number): Promise<any> {
    let body = {
      ID: id,
      PraticaID: praticaID
    }
    let promise = new Promise((resolve, reject) => {
      this.api.post('Noleggio/UpdatePraticaAssociata/' + this.api.username + '/' + this.api.password + '/', body).subscribe((res: any) => {
        if (res.success) {
          resolve("OK");
        }
        else
          resolve(res);
      }, (err) => {
        reject(err);
      });
    });

    return promise;
  }

  add(noleggio: Noleggio){
    let body = {
      noleggio
    };   
    let promise = new Promise((resolve, reject) => {
      this.api.post('Noleggio/Insert/' + this.api.username + '/' + this.api.password + '/', body).subscribe((res: any) => {
        if (res.success) {
          resolve(res);
        }
        else {
          reject(res);
        }
          
      }, (err) => {
        reject(err);
      });
    });

    return promise;

  }

  end(rientro: Rientro){
    let body = {
      rientro
    };   
    let promise = new Promise((resolve, reject) => {
      this.api.post('Noleggio/Rientro/' + this.api.username + '/' + this.api.password + '/', rientro).subscribe((res: any) => {
        if (res.success) {
          resolve(res);
        }
        else
          reject(res);
      }, (err) => {
        reject(err);
      });
    });

    return promise;
   
  }


//sinistri child of car

  getSinistriCarList(VetturaID: number){
    let params = {
      VetturaID
    };   
    let promise = new Promise((resolve, reject) => {
      this.api.get('NoleggioSinistri/List/' + this.api.username + '/' + this.api.password + '/', params).subscribe((res: any) => {
        if (res.success) {
          this.globals.noleggioCarSinisti = res.data;
          resolve(res.data);
        }
        else
          reject(res);
      }, (err) => {
        reject(err);
      });
    });

    return promise;

  }

  addSinistri(params: Sinistri) {
    // let body = {
    //   params
    // };   
    let promise = new Promise((resolve, reject) => {
      this.api.post('NoleggioSinistri/Insert/' + this.api.username + '/' + this.api.password + '/', params).subscribe((res: any) => {
        console.log("NoleggioSinistri/Insert", res);
        if (res.success) {
          resolve(res.data);
        }
        else
          reject(res.message);
      }, (err) => {
        console.log("NoleggioSinistri/Insert error", err);
        reject(err);
      });
    });

    return promise;
  }

  updateSinistri(params: Sinistri) {
    
    let promise = new Promise((resolve, reject) => {
      this.api.post('NoleggioSinistri/Update/' + this.api.username + '/' + this.api.password + '/', params).subscribe((res: any) => {
        console.log("NoleggioSinistri/Update", res);
        if (res.success) {
          resolve("OK");
        }
        else
          resolve(res);
      }, (err) => {
        console.log("NoleggioSinistri/Update error", err);
        reject(err);
      });
    });

    return promise;
  }

  /**
   * Added a pratica photo
   * @param SinistroID id of pratica
   * @param photoData image data
   * @return {Promise} FileResult promise
   */
  addSinistriImg(SinistroID: number, photoData: any) {    
    let params = {
      SinistroID: SinistroID
    };   
    let promise = new Promise((resolve, reject) => {
      this.api.postRentPhoto(params, photoData).then((res: any) => {
        console.log("/NoleggioSinistroImmagine/Add", res);
        if (res.success) {
          resolve(res.data);
        }
        else {
          let res = [];
          resolve(res);
        }
      }, (err) => {
        console.log("/NoleggioSinistroImmagine/Add error", err);
        let res = [];
        resolve(res);
      });
    });

    return promise;
  }


  deleteSinistriImg(id, sinistro_id){
    let params = {
      ID: id,
      SinistroID: sinistro_id
    };   
    let promise = new Promise((resolve, reject) => {
      this.api.get('NoleggioSinistroImmagine/Remove/' + this.api.username + '/' + this.api.password + '/', params).subscribe((res: any) => {
        if (res.success) {
          resolve(true);
        }
        else
          resolve(false);
      }, (err) => {
        console.log("NoleggioSinistroImmagine/Remove error", err);
        resolve(false);
      });
    });

    return promise;

  }

  getClienteDaPratica(PraticaID: number){
    let params = {
      PraticaID: PraticaID
    };   
    let promise = new Promise((resolve, reject) => {
      this.api.get('Noleggio/GetClienteDaPratica/' + this.api.username + '/' + this.api.password + '/', params).subscribe((res: any) => {
        if (res.success) {
          resolve(res);
        }
        else
        reject(res.message);
      }, (err) => {
        console.log("Noleggio/GetClienteDaPratica error", err);
        reject(err);
      });
    });

    return promise;

  }

}
