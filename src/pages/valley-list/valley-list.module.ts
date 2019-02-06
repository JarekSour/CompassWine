import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ValleyListPage } from './valley-list';

@NgModule({
  declarations: [
    ValleyListPage,
  ],
  imports: [
    IonicPageModule.forChild(ValleyListPage),
  ],
})
export class ValleyListPageModule {}
