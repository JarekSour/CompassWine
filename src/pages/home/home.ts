import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
})
export class HomePage {

    constructor(
        public menuCtrl: MenuController,
        public navCtrl: NavController,
        public navParams: NavParams) {
    }

    ionViewDidLoad() { }

    ionViewWillEnter() {
        this.menuCtrl.enable(true, 'menuSlide');
    }

    goTo(page) {
        switch (page) {
            case 'valley_list':
                this.navCtrl.push('ValleyListPage');
                break;
            case 'vineyard_top':
                this.navCtrl.push('VineyardTopPage');
                break;
        }
    }

}
