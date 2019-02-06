import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-valley-list',
    templateUrl: 'valley-list.html',
})
export class ValleyListPage {

    valleys: any;

    constructor(
        public menuCtrl: MenuController,
        public navCtrl: NavController,
        public navParams: NavParams) {
    }

    ionViewDidLoad() {
        let json = JSON.parse(localStorage.getItem('json'));
        this.valleys = json['valleys'];
    }

    ionViewWillEnter() {
        this.menuCtrl.enable(false, 'menuSlide');
    }

    goTo(item) {
        this.navCtrl.push('ValleyOptionPage', { valleys: item });
    }

    errorHandler(event) {
        event.target.src = 'assets/images/default.png';
    }

}
