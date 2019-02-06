import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Platform, ToastController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpProvider } from '../../providers/http/http';
import { ConstantProvider } from '../../providers/constant/constant';
import { Network } from '@ionic-native/network';

@IonicPage()
@Component({
    selector: 'page-splash',
    templateUrl: 'splash.html',
})
export class SplashPage {

    constructor(
        public constPv: ConstantProvider,
        public httpProvider: HttpProvider,
        private network: Network,
        public toastCtrl: ToastController,
        public splashScreen: SplashScreen,
        public platform: Platform,
        public menuCtrl: MenuController,
        public navCtrl: NavController,
        public navParams: NavParams) {
    }

    ionViewDidLoad() {
        this.menuCtrl.enable(false, 'menuSlide');
    }

    ionViewDidEnter() {
        this.platform.ready().then(() => {
            setTimeout(() => {
                this.splashScreen.hide();
                this.getJson();
            }, 100)
        })
    }

    getJson() {
        let formData: FormData = new FormData();
        formData.append('version', '6');
        if (localStorage.getItem('json') === null) {
            this.httpProvider.post(this.constPv.placesUrl(), formData).then(response => {
                if (response['status'] == 'ok') {
                    localStorage.setItem('json', JSON.stringify(response))
                    this.ifLogged();
                } else {
                    this.showToast('Reintente más tarde');
                }
            }).catch(error => {
                this.showToast('Verifica tu conexión a internet');
                let connectSubscription = this.network.onConnect().subscribe(() => {
                    if (this.network.type === 'wifi' || this.network.type === '2g' || this.network.type === '3g' || this.network.type === '4g') {
                        this.getJson();
                    }
                });
            })
        } else {
            this.httpProvider.post(this.constPv.placesUrl(), formData).then(response => {
                if (response['status'] == 'ok') {
                    localStorage.setItem('json', JSON.stringify(response))
                }
                this.ifLogged();
            }).catch(() => {
                this.ifLogged();
            })
        }
    }

    ifLogged() {
        if (localStorage.getItem('user_id') === null)
            this.navCtrl.setRoot('LoginPage');
        else
            this.navCtrl.setRoot('HomePage');
    }

    showToast(msg) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 3000
        });
        toast.present();
    }



}
