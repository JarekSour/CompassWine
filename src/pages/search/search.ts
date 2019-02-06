import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';



@IonicPage()
@Component({
    selector: 'page-search',
    templateUrl: 'search.html',
})
export class SearchPage {

    jsonXL = [];
    json = [];

    constructor(
        public menuCtrl: MenuController,
        public navCtrl: NavController,
        public navParams: NavParams) {
    }

    ionViewDidLoad() {
        this.menuCtrl.enable(false, 'menuSlide');

        let aux = JSON.parse(localStorage.getItem('json'));
        for (let x of aux['valleys']) {
            for (let y of x['places']) {
                this.json.push(y);
            }
        }
        this.json = this.json.sort(function (a, b) {
            return (a['name'] > b['name']) ? 1 : ((a['name'] < b['name']) ? -1 : 0);
        });

        this.jsonXL = this.json;
    }

    getItems(ev: any) {
        this.json = this.jsonXL;
        let val = ev.target.value;

        if (val && val.trim() != '') {
            this.json = this.json.filter((item) => {
                return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        }
    }

    toDetail(item) {
        this.navCtrl.push('PlaceShowPage', { vineyard: item });
    }

}
