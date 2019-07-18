import { Component, OnInit } from '@angular/core';
import {AlertController, NavController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PasswordValidation} from '../../../services/PasswordValidation';
import {Utente} from '../../model/utente.model';
import {UtenteService} from '../../../services/utente.service';
import {TranslateService} from '@ngx-translate/core';
import * as moment from 'moment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public signupFormModel: FormGroup;
  newuser: Utente = {
    id: '',
    username: '',
    nome: '',
    email: '',
    dataNascita: '',
    bio: '',
    avatar: ''
  };
  now: any;

  constructor(private navController: NavController,
              private formBuilder: FormBuilder,
              private utenteservice: UtenteService,
              private alertController: AlertController,
              private translate: TranslateService) { }

  ngOnInit() {
    this.now = moment().format('YYYY-MM-DD');
    this.signupFormModel = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(40)
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(25)
      ])],
      confirmpassword: ['', Validators.compose([
          Validators.maxLength(25)
        ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      dat: ['', Validators.compose([
          Validators.required
      ])
      ],
    }, {
        validator: PasswordValidation.MatchPassword
    });
  }

    onHome() {

      /*
        if (this.signupFormModel.invalid) {
            return;
        }*/
        this.navController.navigateRoot('notizie');
    }

  onCreate() {
    this.newuser.username = this.signupFormModel.value.username;
    this.newuser.email = this.signupFormModel.value.email;
    const datanascita = moment(this.signupFormModel.value.dat).format('DD/MM/YYYY');
    this.newuser.dataNascita = datanascita;
    // uso BIO per memorizzare momentaneamente la password da inviare.
    this.newuser.bio = this.signupFormModel.value.password;

    this.utenteservice.createUtente(this.newuser).subscribe((nuovoUtente: Utente) => {
      this.presentAlert();
    }, error1 => {
      this.errorAlert();

    });
  }

  async presentAlert() {
    const a: any = {};

    this.translate.get('SIGNUP_MESSAGE').subscribe(t => {
      a.message = t;
    });

    const alert = await this.alertController.create({
      message: a.message,
      buttons: [
        {
          text: 'OK',
          handler: async () => {
            this.navController.navigateForward('login');
          }
        }]
    });
    return await alert.present();
  }

  async errorAlert() {
    const a: any = {};

    this.translate.get('SIGNUP_HEADER-ERROR').subscribe(t => {
      a.header = t;
    });

    this.translate.get('SIGNUP_MESSAGE-ERROR').subscribe(t => {
      a.message = t;
    });

    const alert = await this.alertController.create({
      header: a.header,
      message: a.message,
      buttons: [
        {
          text: 'OK',
        }]
    });
    return await alert.present();
  }
}
