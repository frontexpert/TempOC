import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'photo-tab',
  templateUrl: 'photo-tab.html'
})
export class PhotoTabComponet {
  photos = [];

  constructor(private imagePicker: ImagePicker, private camera: Camera, private sanitizer: DomSanitizer) {
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
        let  camera_image_url = this.sanitizer.bypassSecurityTrustUrl(image_url);
        let photo = {
          url: camera_image_url,
          checked: false
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
        let  picker_image_url = this.sanitizer.bypassSecurityTrustUrl(image_url);
        console.log(picker_image_url);
        let photo = {
          url: picker_image_url,
          checked: false
        };
        this.photos.push(photo);
      }
    }).catch(err => {
      console.log(err);
    });
  }

  deletePhoto() {
    for (let i = this.photos.length - 1; i >= 0; i--) {
      if (this.photos[i].checked == true) {
        this.photos.splice(i, 1);
      }
    }
  }

  toggle(index) {
    this.photos[index].checked = !this.photos[index].checked;
  }
}