import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = 'SplashPage';

    constructor(
        public alertCtrl: AlertController,
        public platform: Platform,
        public statusBar: StatusBar) {

        platform.ready().then(() => {
            statusBar.styleLightContent();
        });
    }

    goToPage(page) {
        switch (page) {
            case 'valles':
                this.nav.push('ValleyListPage');
                break;
            case 'top_vina':
                this.nav.push('VineyardTopPage');
                break;
            case 'just_wine':
                var json = JSON.parse(localStorage.getItem('json'))['valleys'];
                var items = [];
                for (let valles of json)
                    for (let places of valles['places']) {
                        if (places['category'] == 'wine')
                            items.push(places)
                    }
                this.nav.push('PlaceMapPage', { page: 'vinas', valleys: items, type: 'justWine' });
                break;
            case 'favoritos':
                this.nav.push('PlaceMapPage', { page: 'vinas', type: 'favourite' });
                break;
            case 'perfil':
                this.nav.push('ProfilePage');
                break;
            case 'buscar':
                this.nav.push('SearchPage');
                break;
            case 'tours':
                var json = JSON.parse(localStorage.getItem('json'))['valleys'];
                var items = [];
                for (let valles of json)
                    for (let places of valles['packs']) {
                        items.push(places)

                    }
                this.nav.push('PlaceMapPage', { page: 'pack', valleys: items, type: 'tours' });
                break;
            case 'acerca':
                this.nav.push('AboutPage');
                break;
        }
    }

    closeSesion() {
        let confirm = this.alertCtrl.create({
            title: 'Cerrar sesión',
            message: '¿Esta seguro que deseas cerrar la sesión?',
            buttons: [
                {
                    text: 'Cancelar',
                    handler: () => {
                    }
                },
                {
                    text: 'Aceptar',
                    handler: () => {
                        if (localStorage.getItem('avatar') === null) {
                            localStorage.clear();
                            this.rootPage = 'LoginPage';
                        } else {
                            // this.fb.logout()
                            //     .then(res => {
                            //         localStorage.clear();
                            //         this.rootPage = 'LoginPage';
                            //     })
                            //     .catch(error => {
                            //         this.showToast('Ups! ocurrió un error, reintenta');
                            //     })
                        }
                    }
                }
            ]
        });
        confirm.present();
    }


}
