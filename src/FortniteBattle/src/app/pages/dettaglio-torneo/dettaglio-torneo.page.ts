import { Component, OnInit } from '@angular/core';
import {AlertController, NavController} from '@ionic/angular';
import {TorneoService} from '../../../services/torneo.service';
import {HttpErrorResponse} from '@angular/common/http';
import {UtenteService} from '../../../services/utente.service';
import {Torneo} from '../../model/torneo.model';
import {TranslateService} from '@ngx-translate/core';
import * as moment from 'moment';

@Component({
  selector: 'app-dettaglio-torneo',
  templateUrl: './dettaglio-torneo.page.html',
  styleUrls: ['./dettaglio-torneo.page.scss'],
})
export class DettaglioTorneoPage implements OnInit {

    private torneo: Torneo = {
        id: '',
        nome: '',
        descrizione: '',
        datainizio: '',
        partecipanti: 1,
        durata: '',
        premio1: '',
        premio2: '',
        premio3: '',
        username: ''
    };

    listuser: string[] = ['', ''];
    user = '';
    btnjoin = false;

  constructor(private navController: NavController,
              public  alertController: AlertController,
              private torneoservice: TorneoService,
              private userservice: UtenteService,
              private translate: TranslateService) { }

  ngOnInit() {
      this.btnjoin = false;
      this.user = this.userservice.getUtente().value.username;
      console.log('UTENTE:' + this.user);
      this.torneo = this.torneoservice.getClickTorneo().value;
      this.torneoservice.getClassifica(this.torneo.id).subscribe(value => {
          if (value.username.includes(this.user)) {
              this.listuser = value.username;
              console.log('UTENTECLASSIFICA:' + this.listuser);
          }
      });
      const now = moment().format('DD/MM/YYYY HH:mm');

      if (this.torneo.datainizio < now) {
          this.btnjoin = true;
      }
  }

    leaderboard() {
      this.navController.navigateForward('/classifica');
  }

    async showError() {
        const alert = await this.alertController.create({
            header: 'ERROR!',
            message: 'Internal Server Error',
            buttons: ['OK']
        });

        await alert.present();
    }

    async presentAlert() {
      const a: any = {};

      this.translate.get('TERMINI-CONDIZIONI_HEADER').subscribe(t => {
            a.header = t;
        });
      this.translate.get('TERMINI-CONDIZIONI_MESSAGE').subscribe(t => {
            a.message = t;
        });
      const alert = await this.alertController.create({
            header: a.header,
            message: a.message,
            buttons: [
                {
                    text: 'DISAGREE',
                    role: 'cancel'
                }, {
                    text: 'AGREE',
                    handler: async () => {
                        if (this.torneo.username.includes(this.user) || this.listuser.includes(this.user) ) {
                            this.AlertPartecipazione();
                        } else {

                            this.torneoservice.joinTorneo(this.user, this.torneo.id).subscribe((nuovoTorneo: object) => {

                            }, (err: HttpErrorResponse) => {
                                if (err.status !== 200) {
                                    this.showError();
                                }
                            });
                            this.navController.navigateForward('tornei');
                        }
                    }
                }]
        });
      return await alert.present();
    }

    async AlertPartecipazione() {

        const a: any = {};

        this.translate.get('PARTECIPAZIONE_HEADER').subscribe(t => {
            a.header = t;
        });
        this.translate.get('PARTECIPAZIONE_MESSAGE').subscribe(t => {
            a.message = t;
        });

        const alert = await this.alertController.create({
            header: a.header,
            message: a.message,
            buttons: ['OK']
        });
        await alert.present();
    }
}
