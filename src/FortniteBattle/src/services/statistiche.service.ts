import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Statistiche} from '../app/model/statistiche.model';
import {URL} from '../app/constants';
import {retry} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class StatisticheService {

    constructor(private http: HttpClient) {

    }

    overallStats(id: string) {
        const url = URL.STATISTICHE + '?id=' + id;
        return this.http.get<Statistiche[]>(url).pipe(retry(3));
    }

}
