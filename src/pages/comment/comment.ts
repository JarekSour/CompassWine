import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, ViewController } from 'ionic-angular';
import { ConstantProvider } from '../../providers/constant/constant';
import { HttpProvider } from '../../providers/http/http';

@IonicPage()
@Component({
    selector: 'page-comment',
    templateUrl: 'comment.html',
})
export class CommentPage {

    loader: any;
    param = { type: '', id: '', vineyardName: '', nickname: '' }
    json = { Comentario: '' }

    constructor(
        public constPv: ConstantProvider,
        public httpProvider: HttpProvider,
        public viewCtrl: ViewController,
        public toastCtrl: ToastController,
        public loadingCtrl: LoadingController,
        public navCtrl: NavController,
        public navParams: NavParams) {
    }

    ionViewDidLoad() {
        this.param.id = this.navParams.get('id');
        this.param.vineyardName = this.navParams.get('name');
        this.param.nickname = localStorage.getItem('nickname') === null ? 'Anónimo' : localStorage.getItem('nickname');
    }

    sendComment() {
        let formData: FormData = new FormData();
        formData.append('method', 'post');
        formData.append('user_id', localStorage.getItem('user_id'));
        formData.append('token', localStorage.getItem('token'));
        formData.append('place_id', this.param.id.toString());
        formData.append('nickname', this.param.nickname);
        formData.append('comment', this.json.Comentario);

        this.presentLoading('Enviado tu comentario...');

        this.httpProvider.post(this.constPv.commentUrl(), formData).then((response) => {
            this.loader.dismiss();
            if (response['status'] == 'ok') {
                this.showToast('Tu comentario ha sido enviado.');
                this.viewCtrl.dismiss();
            } else {
                this.showToast('Ups! ocurrió un error, reintente');
            }
        })
    }

    presentLoading(msg) {
        this.loader = this.loadingCtrl.create({
            content: msg,
            enableBackdropDismiss: false
        });
        this.loader.present();
    }

    showToast(msg) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 3000
        });
        toast.present();
    }

}
