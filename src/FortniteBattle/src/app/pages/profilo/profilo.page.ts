import { Component, OnInit } from '@angular/core';
import {Events, NavController} from '@ionic/angular';
import {BehaviorSubject} from 'rxjs';
import {Utente} from '../../model/utente.model';
import {UtenteService} from '../../../services/utente.service';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.page.html',
  styleUrls: ['./profilo.page.scss'],
})
export class ProfiloPage implements OnInit {
  public utente$: BehaviorSubject<Utente>;

  constructor(private navController: NavController,
              private utenteservice: UtenteService,
              public event: Events) {

    this.event.subscribe('avatar:save', (avatarimg) => {
      this.utente$.value.avatar = avatarimg;
      this.event.unsubscribe('avatar:save');
    });
  }

  ngOnInit() {
    this.utente$ = this.utenteservice.getUtente();
  }

  OnUpdate() {
    this.navController.navigateForward('modifica-profilo');
  }

}
