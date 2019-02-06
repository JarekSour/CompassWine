import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-valley-option',
    templateUrl: 'valley-option.html',
})
export class ValleyOptionPage {

    item: any;
    valley = { name: '' }

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams) {
    }

    ionViewDidLoad() {
        this.item = this.navParams.get('valleys');
        this.valley.name = this.item['name'];
    }

    goTo(page) {
        this.navCtrl.push('PlaceMapPage', { page: page, valleys: this.item });
    }

}
