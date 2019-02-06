import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpProvider {

    constructor(public http: HttpClient) { }

    post(url, json) {
        return new Promise((resolve, reject) => {
            this.http.post(url, json)
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }

}
