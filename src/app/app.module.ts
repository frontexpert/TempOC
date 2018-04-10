import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { CorePageModule } from '../pages/core/core.module';
import { ComponentsModule } from '../components/components.module';
import { Globals } from '../shared/globals';
import { PracticesProvider } from '../providers/practices/practices';
import { Api } from '../providers/api/api';

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
    Globals,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Api,
    PracticesProvider
  ]
})
export class AppModule {}
