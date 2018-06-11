import { Component, Input } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { PdfPreviewPage } from '../../../shared/pdf-preview/pdf-preview';
import { DocumentItem } from '../../../../../models/document';
import { Globals } from '../../../../../shared/globals';
import { DocumentsProvider } from '../../../../../providers/documents';

@Component({
  selector: 'documents-tab',
  templateUrl: 'documents-tab.html'
})
export class DocumentsTabComponent {
	@Input() practicaID: number;
  private _isLongPressed: boolean = false;
  private is_opened_templates: boolean = false;


  @Input('documents')
  get documents() {
    return this.innerDocuments;
  }

  set documents(v) {
    if (v !== this.innerDocuments) {
      this.innerDocuments = v;
    }
  }

	private innerDocuments: any[] = [];



  constructor(public navCtrl: NavController,
              private imagePicker: ImagePicker, 
              private camera: Camera, 
              private alert: AlertController,
              public globals: Globals,
              private documentsProvider: DocumentsProvider,
              public navParams: NavParams) {
    
  }

  ngOnInit() {
    console.log("this.photos");
    console.log(this.documents);
  }

  toggle(index) {
    console.log("toggle triggered");
    if (this._isLongPressed == false) {
      this.documents[index].Checked = !this.documents[index].Checked;
      this._isLongPressed = true;  
    }    
  }

  /**
   * Long press event released
   */
  released() {
    this._isLongPressed = false;
  }

  showDocumentDetails(documentItem: DocumentItem): void {
    this.navCtrl.push(PdfPreviewPage, {document: documentItem});
  }

  deleteDocuments() {
    let confirm = this.alert.create({
      title: 'Comform?',
      message: 'Are you sure to delete documents?',
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
            for (let i = this.documents.length - 1; i >= 0; i--) {
              if (this.documents[i].Checked == true) {
                removeItems.push(this.documents[i]);
                this.documents.splice(i, 1);
              }
            }            
            if (removeItems.length > 0) {
              this.globals.showLoading().then(() => {
                this.documentsProvider.deleteDocuments(removeItems, this.practicaID).then(res => {
                  this.globals.hideLoading();
                })
                .catch(err => {
                  console.log('Remove document error: ', err);
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

  openTemplates() {
    this.is_opened_templates = !this.is_opened_templates;
  }

  addDocumentByTemplate(modello) {
    this.is_opened_templates = false;
    this.globals.showLoading().then(() => {
      this.documentsProvider.addDocumentTemp(this.practicaID, modello).then(res => {
        this.documentsProvider.getDocuments(this.practicaID).then(res => {
          this.documents = res;
          this.globals.hideLoading();
        }).catch(err => {
          console.log(err);
          this.globals.hideLoading();
        })
      })
      .catch(err => {
        console.log('Remove document error: ', err);
        this.globals.hideLoading();
      });
    });
  }


  /**
   * Take a new photo using camera
   */
  takeNewDocument() {
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
        this.documentsProvider.addDocument(this.practicaID, imageData).then(res => {
          console.log(res);
          let newDocument = res.data[0];
          newDocument.Url.replace(/\\/g, '/');
          console.log('addDocument', newDocument);

          this.documents.unshift(newDocument);
          console.log(this.documents);

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
          this.documentsProvider.addDocument(this.practicaID, results[i]).then(res => {
            console.log(res);
            let newDocument = res.data[0];
            newDocument.Url.replace(/\\/g, '/');
            this.documents.unshift(newDocument);
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
}