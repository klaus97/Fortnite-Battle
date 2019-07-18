import {Component, OnInit} from '@angular/core';
import {Events, NavController} from '@ionic/angular';
import {NotiziaService} from '../../../services/notizia.service';
import {Notizia} from '../../model/notizia.model';
import {Observable} from 'rxjs';
import {LINGUA} from '../../constants';
import {Storage} from '@ionic/storage';
import {retry, tap} from 'rxjs/operators';
import {UtenteService} from '../../../services/utente.service';
import {StatisticheService} from '../../../services/statistiche.service';
import {StatistichePage} from '../statistiche/statistiche.page';

@Component({
  selector: 'app-notizie',
  templateUrl: './notizie.page.html',
  styleUrls: ['./notizie.page.scss'],
})
export class NotiziePage implements OnInit {

    public notizie$: Observable<Notizia[]>;
    private language: any = null;

  constructor(private navController: NavController,
              private notiziaService: NotiziaService,
              private storage: Storage,
              private utenteservice: UtenteService,
              private statisticheservice: StatisticheService,
              public events: Events) {


    this.events.subscribe('notizia:refresh', (listnotref) => {
      this.notizie$ = listnotref;
      this.events.unsubscribe('avatar:selected');
    });
  }

  ngOnInit() {
    this.storage.get(LINGUA).then((val) => {
      console.log('Language is', val);
      this.language = val;
      this.notizie$ = this.notiziaService.list(this.language);
    });

    // carico la lista delle statistiche nella page notizie per rendere piu
    // efficiente l'apertura della page statistiche altrimenti l'inserimento dei dati avviene dopo 5 secondi circa
    this.utenteservice.getIdPlayer().pipe(retry(10)).subscribe(value => {
          this.statisticheservice.overallStats(value).pipe(retry(10)).subscribe(value1 => {
              StatistichePage.overallstats = value1;
          });
      });
  }

  doRefresh(event) {

    this.storage.get(LINGUA).then((val) => {
      console.log('Language is', val);
      this.language = val;
      this.notizie$ = this.notiziaService.list(this.language).pipe(tap(() => {
        event.target.complete();
      }));
    });
  }

}
