import { Component, OnInit } from '@angular/core';
import {AlertController, Events, NavController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';
import {Utente} from '../../model/utente.model';
import {UtenteService} from '../../../services/utente.service';
import {Lingua, LinguaService} from '../../../services/lingua.service';
import {TranslateService} from '@ngx-translate/core';
import * as moment from 'moment';
import {NotiziaService} from '../../../services/notizia.service';

@Component({
  selector: 'app-modifica-profilo',
  templateUrl: './modifica-profilo.page.html',
  styleUrls: ['./modifica-profilo.page.scss'],
})
export class ModificaProfiloPage implements OnInit {

  constructor(private navController: NavController,
              private formBuilder: FormBuilder,
              private utenteservice: UtenteService,
              private alertController: AlertController,
              private linguaService: LinguaService,
              private translate: TranslateService,
              public events: Events,
              private notiziaservice: NotiziaService) { }

  public modprofileFormModel: FormGroup;
  public utente$: BehaviorSubject<Utente>;
  public temp = '';
  private user: Utente;
  private lingue: Lingua[];
  now: any;

  ngOnInit() {
    this.now = moment().format('YYYY-MM-DD');
    this.lingue = this.linguaService.getLingue();
    this.utente$ = this.utenteservice.getUtente();
    this.temp = this.utente$.value.avatar;

    this.modprofileFormModel = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(40)
      ])],
      nome: ['', Validators.compose([
        Validators.maxLength(35)
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      dataNascita: ['', Validators.compose([
        Validators.required
      ])
      ],
      bio: ['', Validators.compose([
        Validators.maxLength(100)
      ])],
      linguaPreferita: ['', Validators.compose([
        Validators.required
      ])]
    });

    this.linguaService.getLinguaAttuale().subscribe((lingua) => {
      this.modprofileFormModel.patchValue({linguaPreferita: lingua});
    });

    this.utenteservice.getUtente().subscribe((utente) => {
      this.modprofileFormModel.patchValue({username: utente.username, email: utente.email,
           dataNascita: utente.dataNascita, bio: utente.bio, nome: utente.nome});
      this.user = utente;
    });
  }

  OnSave() {
    this.linguaService.updateLingua(this.modprofileFormModel.value.linguaPreferita);
    this.user.username = this.modprofileFormModel.value.username;
    this.user.email = this.modprofileFormModel.value.email;
    const dt = moment(this.modprofileFormModel.value.dataNascita).format('YYYY/MM/DD');
    this.user.dataNascita = dt;
    this.user.bio = this.modprofileFormModel.value.bio;
    this.user.nome = this.modprofileFormModel.value.nome;
    this.user.avatar = this.temp;
    this.utenteservice.updateProfilo(this.user).subscribe((nuovoUtente: Utente) => {
      this.presentAlert();
    });
    const linguascelta = this.modprofileFormModel.value.linguaPreferita;

    this.events.publish('avatar:save', this.utente$.value.avatar);

    this.translate.use(linguascelta);

    this.refreshNews(linguascelta);

  }

  async presentAlert() {

    const a: any = {};

    if (true) {
      this.translate.get('UPDATE-PROFILO_HEADER').subscribe(t => {
        a.header = t;
      });
      this.translate.get('UPDATE-PROFILO_MESSAGE').subscribe(t => {
        a.message = t;
      });
      const alert = await this.alertController.create({
        header: a.header,
        message: a.message,
        buttons: [
          {
            text: 'OK',
            handler: async () => {
              this.navController.navigateBack('profilo');
            }
          }]
      });
      return await alert.present();
    } else {
      this.translate.get('UPDATE-PROFILO_HEADER-ERROR').subscribe(t => {
        a.header = t;
      });
      this.translate.get('UPDATE-PROFILO_MESSAGE-ERROR').subscribe(t => {
        a.message = t;
      });
      const alert = await this.alertController.create({
        header: 'Error!',
        message: 'Ci sono stati errori nell\'aggiornamento del tuo profilo',
        buttons: ['OK']
      });
      return await alert.present();
    }
  }

    onChangeAvatar() {
        this.navController.navigateForward('/modifica-avatar');

        this.events.subscribe('avatar:selected', (image) => {
          this.temp = image;
        });
    }

    async refreshNews(lingua: string) {
      const listnot =  this.notiziaservice.list(lingua);
      this.events.publish('notizia:refresh', listnot);
    }

}
