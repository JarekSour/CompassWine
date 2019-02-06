import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController, LoadingController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { ConstantProvider } from '../../providers/constant/constant';

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    loader: any;
    jsonLogin = { email: '', pass: '' };

    constructor(
        public constantProvider: ConstantProvider,
        public httpProvider: HttpProvider,
        public loadingCtrl: LoadingController,
        public toastCtrl: ToastController,
        public menuCtrl: MenuController,
        public navCtrl: NavController,
        public navParams: NavParams) {
    }

    ionViewDidLoad() {
        this.menuCtrl.enable(false, 'menuSlide');
    }

    loginRequest() {
        var formData: FormData = new FormData();
        formData.append('method', 'login');
        formData.append('email', this.jsonLogin.email);
        formData.append('pass', this.jsonLogin.pass);
        this.presentLoading('Verificando sus credenciales...');
        this.httpProvider.post(this.constantProvider.userUrl(), formData).then((response) => {
            if (response['status'] == 'ok') {
                localStorage.setItem('token', response['token'])
                localStorage.setItem('user_id', response['user_id'])
                this.userDataRequest(response['user_id'], response['token'])
                if(localStorage.getItem('json') === null){
                    var formData: FormData = new FormData();
                    formData.append('version', '6');
                    this.httpProvider.post(this.constantProvider.placesUrl(), formData).then(response => {
                        if (response['status'] == 'ok') {
                            localStorage.setItem('json', JSON.stringify(response))
                        }
                    })
                }
            } else {
                this.loader.dismiss();
                this.showToast('Correo electrónico o contraseña incorrecta')
            }
        }).catch(() => {
            this.loader.dismiss();
            this.showToast('Compruebe su conexión a internet')
        })



    }

    userDataRequest(id, token) {
        let formData: FormData = new FormData();
        formData.append('method', 'load');
        formData.append('user_id', id);
        formData.append('token', token);
        this.httpProvider.post(this.constantProvider.userUrl(), formData).then((response) => {
            if (response['status'] == 'ok') {
                localStorage.setItem('nickname', response['user']['name']);
                localStorage.setItem('email', response['user']['email']);
                localStorage.setItem('country', response['user']['country']);
                this.loadFavorite(id, token);
                this.navCtrl.setRoot('HomePage');
            } else {
                this.navCtrl.setRoot('HomePage');
            }
            this.loader.dismiss();
        })
    }

    loginFBRequest() {

    }

    loadFavorite(id, token) {
        let formData: FormData = new FormData();
        formData.append('method', 'get');
        formData.append('user_id', id);
        formData.append('token', token);
        this.httpProvider.post(this.constantProvider.favoriteUrl(), formData).then((response) => {
            if (response['status'] == 'ok') {
                localStorage.setItem('favorite', JSON.stringify(response['places']))
            }
        })
    }

    goRegister() {
        this.navCtrl.push('RegisterPage');
    }

    goRecovery() {
        this.navCtrl.push('RecoveryPage');
    }

    showToast(msg) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 3000
        });
        toast.present();
    }

    presentLoading(msg) {
        this.loader = this.loadingCtrl.create({
            content: msg,
            enableBackdropDismiss: false
        });
        this.loader.present();
    }

}
