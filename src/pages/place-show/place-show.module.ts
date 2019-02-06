import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlaceShowPage } from './place-show';

@NgModule({
  declarations: [
    PlaceShowPage,
  ],
  imports: [
    IonicPageModule.forChild(PlaceShowPage),
  ],
})
export class PlaceShowPageModule {}
