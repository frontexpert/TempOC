import { Component, Output, EventEmitter } from '@angular/core';
import { Globals } from '../../../../../shared/globals';
import { CarRentalProvider } from '../../../../../providers/car-rental';
import { SinistriFormPage } from "../sinistri-form/sinistri-form";
import { ModalController, AlertController, Events } from 'ionic-angular';
import { FullscreenPhotoViewPage } from '../../../shared/fullscreen-photo-view/fullscreen-photo-view';

@Component({
  selector: 'stato-veicolo-tab',
  templateUrl: 'stato-veicolo-tab.html'
})
export class StatoVeicoloTabComponent {
  @Output() onNextTab: EventEmitter<any> = new EventEmitter();
  @Output() onBackTab: EventEmitter<any> = new EventEmitter();

  sinistro_id: number = 0;
  sinistro_desc: string = "";
  sinistro_img_url: string = "";
  siministriImages = [];
  imgDelCount = 0;

  is_view_mode: boolean = true;
  check_states: Array<any> = [];
  private _isLongPressed: boolean = false;

  constructor(public globals: Globals,
              public car_rent: CarRentalProvider,
              private alert: AlertController,
              public modalCtrl: ModalController, 
              public events: Events) {
                console.log('StatoVeicoloTab');
                console.log(globals.noleggio.Sinistri);
  }

  ngOnInit() {
    this.initCheckStates();
    this.events.subscribe("initCheckStates", () => {
      this.initCheckStates();
    })
  }

  initCheckStates() {
    this.check_states = [];
    if(this.globals.noleggio.Sinistri != null)
    {
      for (let i = 0; i < this.globals.noleggio.Sinistri.length; i++) {
        let sinistri_check_states = [];
        if (this.globals.noleggio.Sinistri[i].Immagini != null) {
          for (let j = 0; j < this.globals.noleggio.Sinistri[i].Immagini.length; j++) {
            let check_state = {
              checked: false
            };
            sinistri_check_states.push(check_state);
          }
        }
        this.check_states.push(sinistri_check_states);
      }
    }
  }

  convertToLocalDate(iso_date_str: string) {
    let d = new Date(iso_date_str);
    return d.toLocaleDateString();
  }

  // formatDate(myDate){
  //   let date = new Date(myDate);
  //   return(date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear());
  // }

  /**
   * Show create offer modal dialog
   */
  showSinistriModal(index: number): void {
    let data = {
      sinistri_index: index
    };
    let modal = this.modalCtrl.create(SinistriFormPage, data, {
      cssClass: 'sinistri-form-modal',
      showBackdrop: false
    });
    modal.present().then(() => {
    });
  }


  onClickItem(i, j) {
    if (this.is_view_mode) {
      this.displayFullscreenImage(i, j);
    }
    else {
      this.check_states[i][j].checked = !this.check_states[i][j].checked;
      this.check_states[i][j].checked ? this.imgDelCount++ : this.imgDelCount--
    }
  }

  /**
   * Display full screen Photo when the user click the photo Thumb
   * @param {number} index index of selected photo
   */
  displayFullscreenImage(i, j) {
    let photos = [];

    for (let j = 0; j < this.globals.noleggio.Sinistri[i].Immagini.length; j++) {
      let photo = {
        Url: this.globals.noleggio.Sinistri[i].Immagini[j].Url
      };
      photos.push(photo);
    }

    let fullscreenViewModal = this.modalCtrl.create(FullscreenPhotoViewPage, {photos: photos, activeIndex: j});
    fullscreenViewModal.present();
  }


  deletePhoto() {
    let confirm = this.alert.create({
      title: 'Confermi?',
      message: 'Sei sicuro di voler eliminare le foto selezionate?',
      buttons: [
        {
          text: "Cancella",
          handler: () => {
            console.log('Foto eliminate...');
          }
        },
        {
          text: 'OK',
          handler: () => {
            let removeItems = [];
            for (let i = 0; i < this.check_states.length; i++) {
              for (let j = 0; j < this.check_states[i].length; j++) {
                if (this.check_states[i][j].checked == true) {
                  let removeItem = {
                    ID: this.globals.noleggio.Sinistri[i].Immagini[j].ID,
                    SinistroID: this.globals.noleggio.Sinistri[i].ID,
                    index_i: i,
                    index_j: j
                  }
                  removeItems.push(removeItem);
                }
              }
            }
            if (removeItems.length > 0) {
              this.globals.showLoading().then(() => {
                let promises = [];
                for (let i = 0; i < removeItems.length; i++) {
                  promises.push(this.car_rent.deleteSinistriImg(removeItems[i].ID, removeItems[i].SinistroID));
                }
                Promise.all(promises).then((values: any[]) => {
                  for (let i = values.length - 1; i >= 0; i--) {
                    if (values[i] == true) {
                      this.globals.noleggio.Sinistri[removeItems[i].index_i].Immagini.splice(removeItems[i].index_j, 1);
                    }
                    else {
                      this.globals.showToastError("Errore rimozione immogine n. " + removeItems[i].ID);
                      console.error("Remove Failed on ImageID: " + removeItems[i].ID);
                    }
                  }
                  this.convertToViewMode();
                  this.globals.hideLoading();
                })
                .catch(err => {
                  console.log('StatoVeicoloTab -> deleteSinistriImg - > Remove photo error: ', err);
                  this.globals.hideLoading();
                });
              });
            }
          }
        }
      ]
    });
    confirm.present();
  }

  toggle(i, j) {
    if (this._isLongPressed == false) {
      this.check_states[i][j].checked = !this.check_states[i][j].checked;
      this.check_states[i][j].checked ? this.imgDelCount++ : this.imgDelCount--
      this.is_view_mode = false;
      this._isLongPressed = true;  
    }    
  }


  convertToViewMode() {
    this.is_view_mode = true;
    this._isLongPressed = false;
    this.imgDelCount  = 0;
    this.initCheckStates();
  }
}