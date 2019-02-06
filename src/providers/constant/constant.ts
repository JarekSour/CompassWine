import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ConstantProvider {

    constructor(public http: HttpClient) { }

    placesUrl() {
        return 'http://compasswineapp.com/compasswine_ws/places';
    }

    userUrl(){
        return 'http://compasswineapp.com/compasswine_ws/user';
    }

    favoriteUrl(){
        return 'http://compasswineapp.com/compasswine_ws/favorite';
    }

    ratingUrl(){
        return 'http://compasswineapp.com/compasswine_ws/rating';
    }

    commentUrl(){
        return 'http://compasswineapp.com/compasswine_ws/comment';
    }

}
