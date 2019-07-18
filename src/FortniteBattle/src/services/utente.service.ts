import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Utente} from '../app/model/utente.model';
import {AUTH_TOKEN, UTENTE_STORAGE, X_AUTH, URL, URL_BASE} from '../app/constants';
import {map, retry} from 'rxjs/operators';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Storage} from '@ionic/storage';

export interface Account {
    username: string;
    password: string;

}

@Injectable({
    providedIn: 'root'
})

export class UtenteService {
    private authToken: string;
    private loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private utente$: BehaviorSubject<Utente> = new BehaviorSubject<Utente>({} as Utente);

    constructor(private http: HttpClient, private storage: Storage) {

        this.storage.get(AUTH_TOKEN).then((token) => {
           // console.log(token);
            this.authToken = token;
            if (token !== null && token !== undefined && token !== '') {
                this.loggedIn$.next(true);
            }
        });
        this.storage.get(UTENTE_STORAGE).then((utente) => {
            this.utente$.next(utente);
        });

    }

   login(account: Account): Observable<Utente> {

         return this.http.post<Utente>(URL.LOGIN, account,
            {observe: 'response'}).pipe(
            map((resp: HttpResponse<Utente>) => {

                const token = resp.headers.get(X_AUTH);
                this.storage.set(AUTH_TOKEN, token);
                this.authToken = token;
                // Utente memorizzato nello storage in modo tale che se si vuole cambiare il
                // profilo dell'utente stesso non si fa una chiamata REST.
                this.storage.set(UTENTE_STORAGE, resp.body);
                // update dell'observable dell'utente
                this.utente$.next(resp.body);
                this.loggedIn$.next(true);
                // console.log(token);

                console.log(resp.body);
                return resp.body;
            }));
    }


    updateProfilo(user: Utente): Observable<Utente> {
        return this.http.put<Utente>(URL.UPDATE_PROFILO, user, {observe: 'response'}).pipe(
            map((resp: HttpResponse<Utente>) => {
                // Aggiornamento dell'utente nello storage.
                this.storage.set(UTENTE_STORAGE, resp.body);
                // update dell'observable dell'utente
                this.utente$.next(resp.body);
                return resp.body;
            }));
    }

    logout() {
        this.authToken = null;
        this.loggedIn$.next(true);
        this.storage.remove(AUTH_TOKEN);
        this.storage.remove(UTENTE_STORAGE);

        // Nessuna chiamata al server perche' JWT e' stateless quindi non prevede alcun logout.
        // Per gestirlo si dovrebbe fare lato server una blacklist.
    }

    getAuthToken(): string {
        return this.authToken;
    }

    getUtente(): BehaviorSubject<Utente> {
        return this.utente$;
    }

    isLogged(): Observable<boolean> {
        return this.loggedIn$.asObservable();
    }

    createUtente(newuser: Utente): Observable<Utente> {
       return this.http.post<Utente>(URL.SIGNUP, newuser);

    }

    getIdPlayer(): Observable<string> {
        const user = this.getUtente().value.username;
        const  url = URL_BASE + '/users/idplayer?user=' + user;
        return this.http.get<string>(url).pipe(retry(10));
    }

}
