import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html',
})
export class ProfilePage {

    user = { name: '', email: '', country: '', avatar: '' }

    constructor(
        public menuCtrl: MenuController,
        public navCtrl: NavController,
        public navParams: NavParams) {
    }

    ionViewDidLoad() {
        this.user.name = localStorage.getItem('nickname');
        this.user.email = localStorage.getItem('email');
        this.user.country = localStorage.getItem('country');
        this.user.country = localStorage.getItem('country');
        this.user.avatar = localStorage.getItem('avatar') === null ? 'assets/images/profile.jpg' : localStorage.getItem('avatar');
    }

    ionViewWillEnter() {
        this.menuCtrl.enable(false, 'menuSlide');
    }

}
