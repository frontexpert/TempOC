import { Component, Input } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { DomSanitizer } from '@angular/platform-browser';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'photo-tab',
  templateUrl: 'photo-tab.html'
})
export class PhotoTabComponet {
  @Input() photos: any[] = [];

  // photos = [];
  storage_images = [];

  constructor(private imagePicker: ImagePicker, private camera: Camera, private sanitizer: DomSanitizer, private alert: AlertController, public storage: Storage) {
  }

  ngOnInit() {
    this.storage.get('potoData').then(data => {
      if (data != null) {
        this.storage_images = data;
        for (let i = 0; i < this.storage_images.length; i++) {
          let  picker_image_url = this.sanitizer.bypassSecurityTrustUrl(this.storage_images[i]);
          let photo = {
            Url: picker_image_url,
            Checked: false
          };
          this.photos.push(photo);
        }
      }
      else {
          this.storage_images = [];
      }
    }).catch(err => {
      console.log(err);
    });
  }

  takeNewPhoto() {
    let cameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,      
      quality: 80,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }
  
    this.camera.getPicture(cameraOptions).then(imageData => {
      let image_url = "data:image/jpeg;base64, " + imageData;
      this.storage_images.push(image_url);
      this.storage.set('potoData', this.storage_images);
      let  camera_image_url = this.sanitizer.bypassSecurityTrustUrl(image_url);
      let photo = {
        Url: camera_image_url,
        Checked: false
      };
      this.photos.push(photo);
    }).catch(err => console.log(err));
  }

  selectNewPhoto() {
    let options = {
      maximumImagesCount: 15,
      width: 1000,
      height: 1000,
      quality: 80,
      outputType: 1
    }
    this.imagePicker.getPictures(options).then(imagesData => {
      for (let i = 0; i < imagesData.length; i++) {
        let image_url = "data:image/jpeg;base64, " + imagesData[i];
        this.storage_images.push(image_url);
        let  picker_image_url = this.sanitizer.bypassSecurityTrustUrl(image_url);
        let photo = {
          Url: picker_image_url,
          Checked: false
        };
        this.photos.push(photo);
      }
      this.storage.set('potoData', this.storage_images);
    }).catch(err => {
      console.log(err);
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
            for (let i = this.photos.length - 1; i >= 0; i--) {
              if (this.photos[i].checked == true) {
                this.photos.splice(i, 1);
                this.storage_images.splice(i, 1);
              }
            }
            this.storage.set('potoData', this.storage_images);
          }
        }
      ]
    });
    confirm.present();
  }

  toggle(index) {
    this.photos[index].checked = !this.photos[index].checked;
  }
}