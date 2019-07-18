import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {URL} from '../app/constants';
import {Arma} from '../app/model/arma.model';

@Injectable({
    providedIn: 'root'
})

export class ArmaService {

    constructor(private http: HttpClient) {

    }

    getAllArmi() {
        return this.http.get<Arma[]>(URL.ARMI);
    }

}
