import { Component, OnInit } from '@angular/core';
import {AlertController, NavController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TorneoService} from '../../../services/torneo.service';
import {Torneo} from '../../model/torneo.model';
import {UtenteService} from '../../../services/utente.service';
import * as moment from 'moment';

@Component({
  selector: 'app-crea-torneo',
  templateUrl: './crea-torneo.page.html',
  styleUrls: ['./crea-torneo.page.scss'],
})
export class CreaTorneoPage implements OnInit {
    public createtorFormModel: FormGroup;
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
    now: any;

  constructor(private navController: NavController,
              private alertController: AlertController,
              private formBuilder: FormBuilder,
              private torneoservice: TorneoService,
              private utenteservice: UtenteService) { }

  ngOnInit() {
      this.now = moment().format('YYYY-MM-DD');
      this.createtorFormModel = this.formBuilder.group({
          nome: ['', Validators.compose([
              Validators.required,
              Validators.maxLength(40)
          ])],
          descrizione: ['', Validators.compose([
              Validators.required,
              Validators.maxLength(50)
          ])],
          datainizio: ['', Validators.compose([
              Validators.required
          ])],
          durata: ['', Validators.compose([
              Validators.required
          ])
          ],
          premio1: ['', Validators.compose([
              Validators.required,
              Validators.maxLength(25)
          ])
          ],
          premio2: ['', Validators.compose([
              Validators.required,
              Validators.maxLength(25)
          ])
          ],
          premio3: ['', Validators.compose([
              Validators.required,
              Validators.maxLength(25)
          ])
          ]
      });
  }

  OnCreaTor() {
      this.torneo.nome = this.createtorFormModel.value.nome;
      this.torneo.descrizione = this.createtorFormModel.value.descrizione;
      this.torneo.durata = this.createtorFormModel.value.durata;
      const data = moment(this.createtorFormModel.value.datainizio).format('DD/MM/YYYY HH:mm');
      this.torneo.datainizio = data;
      this.torneo.premio1 = this.createtorFormModel.value.premio1;
      this.torneo.premio2 = this.createtorFormModel.value.premio2;
      this.torneo.premio3 = this.createtorFormModel.value.premio3;
      this.torneo.username = this.utenteservice.getUtente().value.username;


      this.torneoservice.createTorneo(this.torneo).subscribe((nuovoTorneo: Torneo) => {
          this.presentAlert();
      });
  }

    async  presentAlert() {
        const alert = await this.alertController.create({
            message: 'Torneo creato correttamente!',
            buttons: [
                {
                    text: 'OK',
                    handler: async () => {
                        this.navController.navigateForward('tornei');
                    }
                }]
        });
        return await alert.present();
    }
}
