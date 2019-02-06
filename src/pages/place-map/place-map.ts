import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { ConstantProvider } from '../../providers/constant/constant';
import { HttpProvider } from '../../providers/http/http';
import L from "leaflet";
// import 'leaflet.tilelayer.fallback';

// declare module "leaflet" {
//     namespace tileLayer {
//         function fallback(url: string, options?: any): any;
//     }
// }

@IonicPage()
@Component({
    selector: 'page-place-map',
    templateUrl: 'place-map.html',
})
export class PlaceMapPage {

    promotedIcon = L.icon({
        iconUrl: 'assets/images/pin_promoted.png',
        iconSize: [25, 36],
        shadowSize: [50, 64],
        iconAnchor: [15, 78],
        shadowAnchor: [4, 62],
        popupAnchor: [-3, -76]
    });

    normalIcon = L.icon({
        iconUrl: 'assets/images/pin.png',
        iconSize: [25, 36],
        shadowSize: [50, 64],
        iconAnchor: [15, 78],
        shadowAnchor: [4, 62],
        popupAnchor: [-3, -76]
    });

    type: string = '';
    typeXL: string = '';
    valleys: any;
    tab: number = 1;
    json = [];
    map: any;
    nameValley: string;
    isPack: boolean = false;

    constructor(
        public menuCtrl: MenuController,
        public constantProvider: ConstantProvider,
        public httpProvider: HttpProvider,
        public navCtrl: NavController,
        public navParams: NavParams) {
    }

    ionViewDidLoad() {
        this.menuCtrl.enable(false, 'menuSlide');

        let from = this.navParams.get('type');

        if (from == 'justWine') {

            this.type = this.navParams.get('page');
            this.valleys = this.navParams.get('valleys');
            this.nameValley = 'Viñas';
            this.typeXL = 'Viñas';
            this.loadJustWine();

        } else if (from == 'favourite') {

            this.nameValley = 'Favoritos';
            this.typeXL = 'Favoritos';
            let formData: FormData = new FormData();
            formData.append('method', 'get');
            formData.append('user_id', localStorage.getItem('user_id'));
            formData.append('token', localStorage.getItem('token'));
            this.httpProvider.post(this.constantProvider.favoriteUrl(), formData).then((response) => {
                if (response['status'] == 'ok') {
                    this.valleys = response['places']
                }
                this.loadFavourites();
            })

        } else if (from == 'tours') {
            this.nameValley = 'Packs';
            this.typeXL = 'Pack';
            this.valleys = this.navParams.get('valleys');
            this.loadPacks();
        } else {

            this.type = this.navParams.get('page');
            this.valleys = this.navParams.get('valleys');
            this.nameValley = this.valleys.name;

            switch (this.type) {
                case 'vinas':
                    this.typeXL = 'Viñas';
                    break;
                case 'dormir':
                    this.typeXL = 'Dormir';
                    break;
                case 'comer':
                    this.typeXL = 'Comer';
                    break;
                case 'actividades':
                    this.typeXL = 'Actividades';
                    break;
            }
            this.loadMap();
        }
    }

    loadMap() {
        this.map = L.map('map');

        L.tileLayer('assets/mapa/{z}/{x}/{y}.png', { maxZoom: 15, minZoom: 1, errorTileUrl: 'http://tile.openstreetmap.org/{z}/{x}/{y}.png' })
            .addTo(this.map)

        // var layer = L.tileLayer('assets/mapa/{z}/{x}/{y}.png', { maxZoom: 13, minZoom: 1 })
        //     .addTo(this.map)

        for (let item of this.valleys['places']) {
            if (this.type == 'vinas' && item.category == 'wine') {
                this.json.push(item);
                L.marker([item.latitude, item.longitude], { draggable: true, icon: item.promoted == 1 ? this.promotedIcon : this.normalIcon })
                    .bindPopup("<div style='display:flex;border-bottom: 2px dotted white;padding: 0 0 5px 0;'><img style='width: 29px;height: 29px;' src='assets/images/icon_places.png'><span style='color: white;margin: 0 0px 0 7px;'>" + item.name + "</span></div><div style='text-align: center;'><img class='auto' src='assets/images/auto.png'></div>").openPopup()
                    .addTo(this.map);
                this.map.setView([item.latitude, item.longitude], 9)
            }

            if (this.type == 'dormir' && item['category'] == 'pack') {
                this.json.push(item);
                L.marker([item.latitude, item.longitude], { draggable: true, icon: item.promoted == 1 ? this.promotedIcon : this.normalIcon })
                    .bindPopup("<div style='display:flex;border-bottom: 2px dotted white;padding: 0 0 5px 0;'><img style='width: 29px;height: 29px;' src='assets/images/icon_places.png'><span style='color: white;margin: 0 0px 0 7px;'>" + item.name + "</span></div><div style='text-align: center;'><img class='auto' src='assets/images/auto.png'></div>").openPopup()
                    .addTo(this.map);
                this.map.setView([item.latitude, item.longitude], 9)
            }

            if (this.type == 'actividades' && item['category'] == 'activity') {
                this.json.push(item);
                L.marker([item.latitude, item.longitude], { draggable: true, icon: item.promoted == 1 ? this.promotedIcon : this.normalIcon })
                    .bindPopup("<div style='display:flex;border-bottom: 2px dotted white;padding: 0 0 5px 0;'><img style='width: 29px;height: 29px;' src='assets/images/icon_places.png'><span style='color: white;margin: 0 0px 0 7px;'>" + item.name + "</span></div><div style='text-align: center;'><img class='auto' src='assets/images/auto.png'></div>").openPopup()
                    .addTo(this.map);
                this.map.setView([item.latitude, item.longitude], 9)
            }

            if (this.type == 'comer' && item['category'] == 'eat') {
                this.json.push(item);
                L.marker([item.latitude, item.longitude], { draggable: true, icon: item.promoted == 1 ? this.promotedIcon : this.normalIcon })
                    .bindPopup("<div style='display:flex;border-bottom: 2px dotted white;padding: 0 0 5px 0;'><img style='width: 29px;height: 29px;' src='assets/images/icon_places.png'><span style='color: white;margin: 0 0px 0 7px;'>" + item.name + "</span></div><div style='text-align: center;'><img class='auto' src='assets/images/auto.png'></div>").openPopup()
                    .addTo(this.map);
                this.map.setView([item.latitude, item.longitude], 9)
            }
        }

        if (this.json.length == 0) {
            this.map.setView([-34.337333, -71.102871], 8)
        }
    }

    loadJustWine() {
        this.map = L.map('map');
        L.tileLayer('assets/mapa/{z}/{x}/{y}.png', { maxZoom: 13, minZoom: 1 }).addTo(this.map);

        for (let item of this.valleys) {
            this.json.push(item);
            L.marker([item.latitude, item.longitude], { draggable: true, icon: item.promoted == 1 ? this.promotedIcon : this.normalIcon })
                .bindPopup("<div style='display:flex;border-bottom: 2px dotted white;padding: 0 0 5px 0;'><img style='width: 29px;height: 29px;' src='assets/images/icon_places.png'><span style='color: white;margin: 0 0px 0 7px;'>" + item.name + "</span></div><div style='text-align: center;'><img class='auto' src='assets/images/auto.png'></div>")
                .openPopup()
                .addTo(this.map);
        }

        this.map.setView([-34.337333, -71.102871], 8)
    }

    loadFavourites() {
        this.map = L.map('map');
        L.tileLayer('assets/mapa/{z}/{x}/{y}.png', { maxZoom: 13, minZoom: 1 }).addTo(this.map);
        for (let item of this.valleys) {
            this.json.push(item);
            L.marker([item.latitude, item.longitude], { draggable: true, icon: item.promoted == 1 ? this.promotedIcon : this.normalIcon })
                .bindPopup("<div style='display:flex;border-bottom: 2px dotted white;padding: 0 0 5px 0;'><img style='width: 29px;height: 29px;' src='assets/images/icon_places.png'><span style='color: white;margin: 0 0px 0 7px;'>" + item.name + "</span></div><div style='text-align: center;'><img class='auto' src='assets/images/auto.png'></div>")
                .openPopup()
                .addTo(this.map);
            this.map.setView([item.latitude, item.longitude], 9)
        }

        if (this.valleys.length < 1) {
            this.map.setView([-34.337333, -71.102871], 8);
        }
    }

    loadPacks() {
        this.map = L.map('map');
        L.tileLayer('assets/mapa/{z}/{x}/{y}.png', { maxZoom: 13, minZoom: 1 }).addTo(this.map);
        for (let item of this.valleys) {
            this.json.push(item);
            L.marker([item.latitude, item.longitude], { draggable: true, icon: item.promoted == 1 ? this.promotedIcon : this.normalIcon })
                .bindPopup("<div style='display:flex;border-bottom: 2px dotted white;padding: 0 0 5px 0;'><img style='width: 29px;height: 29px;' src='assets/images/icon_places.png'><span style='color: white;margin: 0 0px 0 7px;'>" + item.name + "</span></div><div style='text-align: center;'><img class='auto' src='assets/images/auto.png'></div>")
                .openPopup()
                .addTo(this.map);
            this.map.setView([item.latitude, item.longitude], 7)
        }

        if (this.valleys.length < 1) {
            this.map.setView([-34.337333, -71.102871], 8)
        }
        this.isPack = true;
    }

    showDetail(item) {
        this.navCtrl.push('PlaceShowPage', { vineyard: item, pack: this.isPack });
    }

}
