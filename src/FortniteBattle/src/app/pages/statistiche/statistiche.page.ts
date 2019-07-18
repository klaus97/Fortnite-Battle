import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {UtenteService} from '../../../services/utente.service';
import {Statistiche} from '../../model/statistiche.model';
import {StatisticheService} from '../../../services/statistiche.service';
import {retry} from 'rxjs/operators';

@Component({
  selector: 'app-statistiche',
  templateUrl: './statistiche.page.html',
  styleUrls: ['./statistiche.page.scss'],
})
export class StatistichePage implements OnInit {

  static overallstats: Statistiche[] = null ;
  stats: Statistiche[] = null ;
  id: string;
  userfortnite: string ;

  constructor(private navController: NavController,
              private utenteservice: UtenteService,
              private statisticheservice: StatisticheService) { }

  ngOnInit() {
    this.stats = StatistichePage.overallstats;
    this.userfortnite = this.utenteservice.getUtente().value.username;

    if (StatistichePage.overallstats == null) {
      this.utenteservice.getIdPlayer().pipe(retry(10)).subscribe(value => {
        this.statisticheservice.overallStats(value).pipe(retry(10)).subscribe(value1 => {
          StatistichePage.overallstats = value1;
        });
      });
    }
  }

  doRefresh(event) {

    setTimeout(() => {
      this.utenteservice.getIdPlayer().pipe(retry(10)).subscribe(value => {
        this.statisticheservice.overallStats(value).pipe(retry(10)).subscribe(value1 => {
          this.stats = value1;
        });
      });
      event.target.complete();
    }, 1000);

  }
}
