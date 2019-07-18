import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {Observable} from 'rxjs';
import {Torneo} from '../../model/torneo.model';
import {TorneoService} from '../../../services/torneo.service';
import {UtenteService} from '../../../services/utente.service';
import * as moment from 'moment';

@Component({
  selector: 'app-tornei',
  templateUrl: './tornei.page.html',
  styleUrls: ['./tornei.page.scss'],
})
export class TorneiPage implements OnInit {
  public tornei$: Observable<Torneo[]>;
  user: string;
  now: any;
  imagecard = ['../assets/img/fortnitewallpaper.jpg', '../assets/img/fortnitewallpaperexpired.jpg'];

  constructor(private navController: NavController, private torneoservice: TorneoService, private  utenteservice: UtenteService) { }

  ngOnInit() {
    this.user = this.utenteservice.getUtente().value.username;
    this.tornei$ = this.torneoservice.listTornei();
    this.now = moment().format('DD/MM/YYYY HH:mm');
  }

  detailtournament(torclick: Torneo) {
    this.torneoservice.setClickTorneo(torclick);
    this.navController.navigateForward('/dettaglio-torneo');
  }

  OnCreatorneo() {
    this.navController.navigateForward('crea-torneo');
  }

  doRefresh(event) {

    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 1000);

  }
}
