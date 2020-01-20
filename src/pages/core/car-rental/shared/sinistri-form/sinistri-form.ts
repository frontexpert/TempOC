import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Events } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { Globals } from '../../../../../shared/globals';
import { Sinistri } from '../../../../../models/noleggio';
import { CarRentalProvider } from '../../../../../providers/car-rental';


@Component({
  selector: 'page-sinistri-form',
  templateUrl: 'sinistri-form.html',
})
export class SinistriFormPage {
  
  sinistro_id: number = 0;
  sinistro_desc: string = "";
  sinistro_img_url: string = "";
  siministriImages = [];
  sinistro_index: number;

    constructor(public navCtrl: NavController, 
                public params: NavParams, 
                public globals: Globals,
                public car_rent: CarRentalProvider,
                private viewCtrl: ViewController,
                private camera: Camera,
                private imagePicker: ImagePicker,
                private events: Events) {
    }

    ngOnInit() {
        this.sinistro_index = this.params.get("sinistri_index");
        console.log('navParam: index: ', this.sinistro_index);
        if (this.sinistro_index != -1) {
            this.sinistro_id = this.globals.noleggio.Sinistri[this.sinistro_index].ID;
            this.sinistro_desc = this.globals.noleggio.Sinistri[this.sinistro_index].Sinistro;
            if(this.globals.noleggio.Sinistri[this.sinistro_index].Immagini != null) {
                for(let image of this.globals.noleggio.Sinistri[this.sinistro_index].Immagini){
                    this.siministriImages.push(image.Thumb);
                };
            }

        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad Sinistri Modal');
    }  

    /**
     * Close modal page
     */
    closeModal(): void {
        this.viewCtrl.dismiss();
    }



    /**
     * Take a new photo using camera
     */
    takeNewPhoto() {
        // if (this.sinistro_id > 0) {
        let cameraOptions = {
            destinationType: this.camera.DestinationType.FILE_URI,      
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            quality: 60,
            targetWidth:720,
            correctOrientation: true
        }
        
        this.camera.getPicture(cameraOptions).then(imageData => {
            //remove file://
            imageData = imageData.replace('file:///','/');
            this.siministriImages.push(imageData);
        }).catch(err => console.log('CAMERA ERROR:', err));
        //}
        // else {
        //   console.log("you didn't added any sinistri yet.");
        // }
    }

    fromGallery() {
        let options = {
            maximumImagesCount: 5
        };
        this.imagePicker.getPictures(options).then(results => {
        for (let i = 0; i < results.length; i++) {
            console.log('Image URI1: ', results[i]);
            this.siministriImages.push(results[i]);
        }      
        }).catch(err => {
            console.log('imagePicker error: ', err);
        });
    }

    addUpdateSinistri() {
        console.log("this.globals.noleggio", this.globals.noleggio);
        if (this.sinistro_id > 0 && this.sinistro_desc != "") {  //update sinistro esistente
            this.globals.showLoading().then(() => {
                let params = new Sinistri();
                params.ID = this.sinistro_id;
                params.NoleggioID = this.globals.noleggio.ID;
                params.Sinistro = this.sinistro_desc;
                params.VetturaID = this.globals.noleggio.VetturaID;
                params.SinistroData = this.globals.noleggio.Sinistri[this.sinistro_index].SinistroData;
                params.Immagini = this.globals.noleggio.Sinistri[this.sinistro_index].Immagini;
        
                this.car_rent.updateSinistri(params).then((res : any) => {
                    console.log("Sinistro update: ", res);
                    if(res == "OK" || res.success){
                        this.globals.showToastSuccess('Sinistro aggiornato con successo.');
                    } else {
                        this.globals.showToastError('Errore associazione pratica.' + res.message);
                    }

                    this.globals.noleggio.Sinistri[this.sinistro_index] = params;
                    this.events.publish("initCheckStates");
                    this.sinistro_index = 0;
                    this.globals.hideLoading();
                    this.saveSinistroPhotos();
                }).catch(err => {
                    console.log(err);
                    this.globals.hideLoading();
                });

            });
        }
        // e' un'insert di un nuovo sinistro su un noleggio esistente
        else if (this.sinistro_desc != "" && this.globals.noleggio.ID != 0 && this.sinistro_id == 0) {
                this.globals.showLoading().then(() => {
                    let params = new Sinistri();
                    params.NoleggioID = this.globals.noleggio.ID;
                    params.Sinistro = this.sinistro_desc;
                    params.VetturaID = this.globals.noleggio.VetturaID;
                    params.SinistroData = new Date().toJSON();
            
                    this.car_rent.addSinistri(params).then((data: any) => {
                        this.sinistro_id = data.SinistroID;
                        params.ID = data.SinistroID;
                        params.Immagini = [];
                        this.globals.noleggio.Sinistri.unshift(params);
                        this.events.publish("initCheckStates");
                        this.sinistro_index = 0;
                        this.globals.hideLoading();
                        this.saveSinistroPhotos();
                    }).catch(err => {
                        console.log(err);
                        this.globals.hideLoading();
                    });
                });
            // inserimento di un sistro nuovo su un noleggio nuovo    
            } else {
            if(this.globals.noleggio.ID == 0 || this.globals.noleggio.ID == null)
            {
                //Preparo un array con i nuovi sinistri, li inserirò solo a noleggio avvenuto
                let sinistro = new Sinistri();
                    //Gli setto noleggio 0
                    sinistro.ID = 0;
                    sinistro.NoleggioID = 0;
                    sinistro.Sinistro = this.sinistro_desc;
                    sinistro.VetturaID = this.globals.noleggio.VetturaID;
                    sinistro.SinistroData = new Date().toJSON();
                    let immagini = [];
                    immagini = this.siministriImages.map((url) => {
                        return {Thumb : url, Url: url}
                    } );
                    sinistro.Immagini = immagini;
                   
                    //Aggiungo l'elemento in cima alla lista
                    this.globals.noleggio.Sinistri.unshift(sinistro);
                    this.sinistro_index = 0;
                    this.dismiss();
            }
        }
    }

    saveSinistroPhotos() {  //TODO: convert in promise
        if (this.siministriImages.length > 0) {
            this.globals.showLoading().then(() => {
                let promises = [];
                for (let i = 0; i < this.siministriImages.length; i++) {
                    if(! ('' + this.siministriImages[i]).startsWith('http')) {
                        promises.push(this.car_rent.addSinistriImg(this.sinistro_id, this.siministriImages[i]));
                    }
                }
                Promise.all(promises).then((values: any[]) => {
                    console.log('add photo success: ', values);
                    for (let i = 0; i < values.length; i++) {
                        if (values[i].length > 0) {
                            console.log('Immagini.push:    *****', JSON.stringify(values[i][0]));
                            console.log('sinistro ID by sinistro_index:    *****', this.globals.noleggio.Sinistri[this.sinistro_index].ID);
                            this.globals.noleggio.Sinistri[this.sinistro_index].Immagini.push(values[i][0]);
                        }
                    }
                    this.events.publish("initCheckStates");
                    this.siministriImages = [];
                    this.globals.hideLoading();
                    this.dismiss();
                }).catch(err => {
                    console.log('ERROR: ', err);
                    this.globals.hideLoading();
                });;
            });
        }
  
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

}
