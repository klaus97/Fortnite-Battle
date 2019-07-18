import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Notizia} from '../app/model/notizia.model';
import {Observable} from 'rxjs';
import {URL} from '../app/constants';
import {retry} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class NotiziaService {

    constructor(private http: HttpClient) {

    }

    list(language): Observable<Notizia[]> {

        return this.http.get<Notizia[]>(URL.NOTIZIE + '?language=' + language,
            {headers: {'Content-Type': 'application/json' , Accept: 'application/json'}}).pipe(retry(5)) ;
    }
}
