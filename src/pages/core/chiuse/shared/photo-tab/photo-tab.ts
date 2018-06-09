import { Component, Input } from '@angular/core';
import { AlertController, ModalController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { Storage } from '@ionic/storage';
import { PhotosProvider } from '../../../../../providers/photos';
import { Globals } from '../../../../../shared/globals';
import { FullscreenPhotoViewPage } from '../../../shared/fullscreen-photo-view/fullscreen-photo-view';


@Component({
  selector: 'photo-tab',
  templateUrl: 'photo-tab.html'
})
export class PhotoTabComponet {
  @Input() photos: any[] = [];
  @Input() practicaID: number;

  storage_images = [];

  private _isLongPressed: boolean = false;

  constructor(private imagePicker: ImagePicker, 
              private camera: Camera, 
              private alert: AlertController,
              private modalCtrl: ModalController, 
              private photosProvider: PhotosProvider,
              public globals: Globals,
              public storage: Storage) {
  }

  ngOnInit() {
  }

  /**
   * Take a new photo using camera
   */
  takeNewPhoto() {
    let cameraOptions = {
      destinationType: this.camera.DestinationType.FILE_URI,      
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      quality: 60,
      targetWidth:720,
      correctOrientation: true
    }
  
    this.camera.getPicture(cameraOptions).then(imageData => {
      this.globals.showLoading().then(() => {
        this.photosProvider.addPhoto(this.practicaID, imageData).then(res => {
          console.log(res);
          let newPhoto = res.data[0];
          newPhoto.Url.replace(/\\/g, '/');
          console.log(newPhoto, 'addPhoto');

          this.photos.unshift(newPhoto);
          console.log(this.photos);

          this.globals.hideLoading();
        })
        .catch(err => {
          console.log('ERROR: ', err);
          this.globals.hideLoading();
        });
      });
    }).catch(err => console.log('CAMERA ERROR:', err));
  }

  /**
   * Select a photo from gallery of device
   */
  fromGallery() {
    let options = {
      maximumImagesCount: 1
    };
    this.imagePicker.getPictures(options).then(results => {
      for (let i = 0; i < results.length; i++) {
        console.log('Image URI1: ', results[i]);
        this.globals.showLoading().then(() => {
          this.photosProvider.addPhoto(this.practicaID, results[i]).then(res => {
            console.log(res);
            let newPhoto = res.data[0];
            newPhoto.Url.replace(/\\/g, '/');
            this.photos.unshift(newPhoto);
            this.globals.hideLoading();
          }).catch(err => {
            console.log('Select photo error: ', err);
            this.globals.hideLoading();
          });
        });        
      }      
    }).catch(err => {
      console.log('imagePicker error: ', err);
    });
  }

  deletePhoto() {
    let confirm = this.alert.create({
      title: 'Comform?',
      message: 'Are you sure to delete photos?',
      buttons: [
        {
          text: "Cancel",
          handler: () => {
            console.log('Cancelled..');
          }
        },
        {
          text: 'OK',
          handler: () => {
            let removeItems = [];
            for (let i = this.photos.length - 1; i >= 0; i--) {
              if (this.photos[i].Checked == true) {
                removeItems.push(this.photos[i]);
                this.photos.splice(i, 1);
              }
            }            
            if (removeItems.length > 0) {
              this.globals.showLoading().then(() => {
                this.photosProvider.deletePhotos(removeItems, this.practicaID).then(res => {
                  this.globals.hideLoading();
                })
                .catch(err => {
                  console.log('Remove photo error: ', err);
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

  toggle(index) {
    if (this._isLongPressed == false) {
      this.photos[index].Checked = !this.photos[index].Checked;
      this._isLongPressed = true;  
    }    
  }

  /**
   * Long press event released
   */
  released() {
    this._isLongPressed = false;
  }

  /**
   * Display full screen Photo when the user click the photo Thumb
   * @param {number} index index of selected photo
   */
  displayFullscreenImage(index: number) {
    let photo = this.photos[index];
    console.log('Photo info: ', photo);

    let fullscreenViewModal = this.modalCtrl.create(FullscreenPhotoViewPage, { imgSrc: photo.Url });
    fullscreenViewModal.present();
  }
}