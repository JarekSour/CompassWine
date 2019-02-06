import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-recovery',
    templateUrl: 'recovery.html',
})
export class RecoveryPage {

    jsonRec = { email: '' }

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams) {
    }

    ionViewDidLoad() {

    }

    recoveryRequest() {

    }

}
