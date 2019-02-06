import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { BrowserTab } from '@ionic-native/browser-tab';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { CallNumber } from '@ionic-native/call-number';
import { EmailComposer } from '@ionic-native/email-composer';
import { HttpProvider } from '../../providers/http/http';
import { ConstantProvider } from '../../providers/constant/constant';
import { Diagnostic } from '@ionic-native/diagnostic';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { Geolocation } from '@ionic-native/geolocation';

@IonicPage()
@Component({
    selector: 'page-place-show',
    templateUrl: 'place-show.html',
})
export class PlaceShowPage {

    star: boolean = false;
    isPack: boolean = false;
    param: any;
    vineyard = {
        id: '', name: '', picture_1: '', picture_2: '', picture_3: '', description: '', website: '', phone: '', email: '', schedule: '', latitude: '',
        longitude: '', comments: [], video_url: '', rating: 0,
        price_dolar: '', price_pesos_cl: ''
    }

    constructor(
        public constantProvider: ConstantProvider,
        public httpProvider: HttpProvider,
        public launchNavigator: LaunchNavigator,
        public geolocation: Geolocation,
        public diagnostic: Diagnostic,
        public modalCtrl: ModalController,
        public toastCtrl: ToastController,
        public emailComposer: EmailComposer,
        public callNumber: CallNumber,
        public iab: InAppBrowser,
        public browserTab: BrowserTab,
        public socialSharing: SocialSharing,
        public navCtrl: NavController,
        public navParams: NavParams) {
    }

    ionViewDidLoad() {
        this.param = this.navParams.get('vineyard');
        this.isPack = this.navParams.get('pack');
        this.vineyard.name = this.param.name;
        this.vineyard.picture_1 = this.param.picture_1.includes('http') ? this.param.picture_1 : 'http://admin.compasswineapp.com/uploads/' + this.param.picture_1;
        this.vineyard.picture_2 = this.param.picture_2.includes('http') ? this.param.picture_2 : 'http://admin.compasswineapp.com/uploads/' + this.param.picture_2;
        this.vineyard.picture_3 = this.param.picture_3.includes('http') ? this.param.picture_3 : 'http://admin.compasswineapp.com/uploads/' + this.param.picture_3;
        this.vineyard.description = this.param.description;
        this.vineyard.website = this.param.website;
        this.vineyard.phone = this.param.phone;
        this.vineyard.email = this.param.email;
        this.vineyard.schedule = this.param.schedule;
        this.vineyard.latitude = this.param.latitude;
        this.vineyard.longitude = this.param.longitude;
        this.vineyard.comments = this.param.comments;
        this.vineyard.video_url = this.param.video_url;
        this.vineyard.id = this.param.id;
        this.vineyard.rating = this.param.rating;

        if (this.isPack == true) {
            this.vineyard.price_dolar = this.param.price_dolar;
            this.vineyard.price_pesos_cl = this.param.price_pesos_cl;
        }

        let fav = JSON.parse(localStorage.getItem('favorite'));
        if (fav.length > 0)
            for (let item of fav) {
                if (item['id'] == this.vineyard.id) {
                    this.star = true;
                }
            }

        this.ratingGet()
    }

    shareFacebook() {
        this.socialSharing.shareViaFacebook('', '', this.vineyard.website).catch(() => this.webTo('https://www.facebook.com/sharer/sharer.php?u=' + this.vineyard.website));
    }

    shareTwitter() {
        this.socialSharing.shareViaTwitter('', '', this.vineyard.website).catch(() => this.webTo('https://.twitter.com/intent/tweet?url=' + this.vineyard.website));
    }

    webTo(url) {
        this.browserTab.isAvailable()
            .then((isAvailable: boolean) => {
                if (isAvailable) {
                    this.browserTab.openUrl(url);
                } else {
                    this.iab.create(url);
                }
            });
    }

    videoTo() {
        this.browserTab.isAvailable()
            .then((isAvailable: boolean) => {
                if (isAvailable) {
                    this.browserTab.openUrl(this.vineyard.video_url);
                } else {
                    this.iab.create(this.vineyard.website);
                }
            });
    }

    emailTo() {
        this.emailComposer.requestPermission().then((response) => {
            if (response) {
                this.emailComposer.isAvailable().then((available: boolean) => {
                    if (available) {
                        let email = {
                            to: this.vineyard.email,
                            subject: 'Compass Wine',
                            body: '',
                            isHtml: true
                        };

                        this.emailComposer.open(email);
                    }
                }).catch((error) => {
                    console.log("error")
                })
            }
        })
    }

    showRoute() {
        this.diagnostic.isLocationEnabled().then((response) => {
            if (response) {
                this.geolocation.getCurrentPosition().then((resp) => {
                    let options: LaunchNavigatorOptions = {
                        start: [resp.coords.latitude, resp.coords.longitude],
                        appSelection: {
                            dialogHeaderText: 'Selecciona una aplicación',
                            cancelButtonText: 'cancelar',
                            rememberChoice: {
                                prompt: {
                                    headerText: 'Alerta',
                                    bodyText: '¿Recordar elección?',
                                    yesButtonText: 'SI',
                                    noButtonText: 'NO'
                                }
                            }
                        }
                    };

                    this.launchNavigator.navigate(this.vineyard.latitude + ', ' + this.vineyard.longitude, options)
                        .then(
                            success => console.log('Launched navigator'),
                            error => { console.log('Launched navigator') }
                        );

                }).catch((error) => {
                    this.showToast('Ups! no fue posible obtener tu posición');
                });
            } else {
                this.showToast('Activa tu GPS y reintenta');
            }
        }).catch((e) => {
            this.showToast('Ups! ocurrió un error');
        });
    }

    callTo() {
        this.callNumber.callNumber(this.vineyard.phone, true)
            .then(() => console.log('Launched dialer!'))
            .catch(() => this.showToast('Ups! ocurrio un error'));
    }

    showModal() {
        let modal = this.modalCtrl.create('CommentPage', { id: this.vineyard.id, name: this.vineyard.name });
        modal.present();
    }

    favUnset() {
        this.star = false;
        let formData: FormData = new FormData();
        formData.append('method', 'unset');
        formData.append('place_id', this.vineyard.id);
        formData.append('user_id', localStorage.getItem('user_id'));
        formData.append('token', localStorage.getItem('token'));
        this.httpProvider.post(this.constantProvider.favoriteUrl(), formData).then(() => {
            let fav = JSON.parse(localStorage.getItem('favorite'));
            for (let item of fav) {
                if (item['id'] == this.vineyard.id) {
                    fav = fav.filter(item => item['id'] !== this.vineyard.id);
                }
            }
            localStorage.setItem('favorite', JSON.stringify(fav))
        })
    }

    favSet() {
        this.star = true;
        let formData: FormData = new FormData();
        formData.append('method', 'set');
        formData.append('place_id', this.vineyard.id);
        formData.append('user_id', localStorage.getItem('user_id'));
        formData.append('token', localStorage.getItem('token'));
        this.httpProvider.post(this.constantProvider.favoriteUrl(), formData).then(() => {
            let fav = JSON.parse(localStorage.getItem('favorite'));
            fav.push(this.param)
            localStorage.setItem('favorite', JSON.stringify(fav))
        })
    }

    ratingSet(rating) {
        this.vineyard.rating = rating;
        let formData: FormData = new FormData();
        formData.append('method', 'set');
        formData.append('place_id', this.vineyard.id);
        formData.append('rating', rating);
        formData.append('user_id', localStorage.getItem('user_id'));
        formData.append('token', localStorage.getItem('token'));
        this.httpProvider.post(this.constantProvider.ratingUrl(), formData).then(() => { })
    }

    ratingGet() {
        let formData: FormData = new FormData();
        formData.append('method', 'get');
        formData.append('place_id', this.vineyard.id);
        formData.append('user_id', localStorage.getItem('user_id'));
        formData.append('token', localStorage.getItem('token'));
        this.httpProvider.post(this.constantProvider.ratingUrl(), formData).then((response) => {
            if (response['status'] == 'ok')
                if (response['rating'] != -1)
                    this.vineyard.rating = response['rating'];
        })
    }

    showToast(msg) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 3000
        });
        toast.present();
    }

    buyTicket() {
        this.webTo('http://payments.compasswineapp.com/compra.php?id=' + this.vineyard.id + '&lang=es')
    }

    errorHandler(event) {
        event.target.src = 'assets/images/default.png';
    }

}
