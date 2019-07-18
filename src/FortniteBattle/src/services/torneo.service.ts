import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {URL} from '../app/constants';
import {Torneo} from '../app/model/torneo.model';
import {Classifica} from '../app/model/classifica.model';


@Injectable({
    providedIn: 'root'
})

export class TorneoService {

    private torneo$: BehaviorSubject<Torneo> = new BehaviorSubject<Torneo>({} as Torneo);

    constructor(private http: HttpClient) {

    }

    listTornei(): Observable<Torneo[]> {
        return this.http.get<Torneo[]>(URL.TORNEO);
    }

    createTorneo(tor: Torneo): Observable<Torneo> {
        const url = URL.TORNEO + '/create' ;
        return this.http.post<Torneo>(url, tor);
    }

    joinTorneo(user: string, id: string): Observable<object>  {
        const url = URL.TORNEO + '/join/' + id ;
        return this.http.post(url, user, {headers: {'Content-Type': 'application/json'}});
    }

    getClickTorneo(): BehaviorSubject<Torneo> {
        return this.torneo$;

    }

    setClickTorneo(torclick: Torneo) {
        this.torneo$.next(torclick);
    }

    getClassifica(id: string) {
        const url = URL.CLASSIFICA + '?idtor=' + id;
        return this.http.get<Classifica>(url);
    }

}
