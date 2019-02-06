import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { ConstantProvider } from '../../providers/constant/constant';
import { Network } from '@ionic-native/network';

@IonicPage()
@Component({
    selector: 'page-vineyard-top',
    templateUrl: 'vineyard-top.html',
})
export class VineyardTopPage {

    topTen: any;

    constructor(
        public constantProvider: ConstantProvider,
        public httpProvider: HttpProvider,
        private network: Network,
        public toastCtrl: ToastController,
        public menuCtrl: MenuController,
        public navCtrl: NavController,
        public navParams: NavParams) {
    }

    ionViewDidLoad() {
        let json = JSON.parse(localStorage.getItem('json'));
        this.topTen = json['topten']['wine'];
    }

    ionViewWillEnter() {
        this.menuCtrl.enable(false, 'menuSlide');
    }

    doRefresh(refresher) {
        let formData: FormData = new FormData();
        formData.append('version', '6');
        this.httpProvider.post(this.constantProvider.placesUrl(), formData).then((response) => {
            if (response['status'] == 'ok') {
                localStorage.setItem('json', JSON.stringify(response));
                let json = JSON.parse(localStorage.getItem('json'));
                this.topTen = json['topten']['wine'];
            }
            if (refresher != null)
                refresher.complete();
        }).catch(() => {
            this.showToast('Verifica tu conexión a internet');
            let connectSubscription = this.network.onConnect().subscribe(() => {
                if (this.network.type === 'wifi' || this.network.type === '2g' || this.network.type === '3g' || this.network.type === '4g') {
                    this.doRefresh(null);
                }
            });
        })
    }

    showVineyard(item) {
        this.navCtrl.push('PlaceShowPage', { vineyard: item });
    }

    showToast(msg) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 3000
        });
        toast.present();
    }

    errorHandler(event) {
        event.target.src = 'assets/images/default.png';
    }
}
