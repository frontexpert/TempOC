import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

/* Import Ionic-Native modules */
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Network } from '@ionic-native/network';
import { FileTransfer } from '@ionic-native/file-transfer'

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { CorePageModule } from '../pages/core/core.module';
import { ComponentsModule } from '../components/components.module';
import { Globals } from '../shared/globals';
import { PracticesProvider } from '../providers/practices';
import { PhotosProvider } from '../providers/photos';
import { DocumentsProvider } from '../providers/documents';
import { Api } from '../providers/api';
import { NetState } from '../providers/network';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp, {
      mode: "ios"
    }),
    HttpClientModule,
    IonicStorageModule.forRoot(),
    CorePageModule,
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    ImagePicker,
    InAppBrowser,
    Network,
    FileTransfer,
    Globals,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Api,
    PracticesProvider,
    PhotosProvider,
    DocumentsProvider,
    NetState
  ]
})
export class AppModule {}
