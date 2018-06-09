import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { FullscreenPhotoViewPage } from './fullscreen-photo-view';

@NgModule({
  declarations: [
    FullscreenPhotoViewPage,
  ],
  imports: [
    IonicPageModule.forChild(FullscreenPhotoViewPage)    
  ],
  providers: [
  ]
})
export class FullscreenPhotoViewPageModule {}
