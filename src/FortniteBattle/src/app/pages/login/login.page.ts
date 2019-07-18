import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertController, NavController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {Account, UtenteService} from '../../../services/utente.service';
import {Utente} from '../../model/utente.model';
import {HttpErrorResponse} from '@angular/common/http';
import {AUTH_TOKEN, UTENTE_STORAGE} from '../../constants';
import {Storage} from '@ionic/storage';
import {Md5} from 'ts-md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginFormModel: FormGroup;
  private loginTitle: string;
  private loginSubTitle: string;

  constructor(private formBuilder: FormBuilder,
              private alertController: AlertController,
              private translateService: TranslateService,
              private navController: NavController,
              private utenteService: UtenteService,
              private storage: Storage) {
  }

  ngOnInit() {
    this.loginFormModel = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.required
      ])]
    });
    this.initTranslate();
  }

  onLogin() {
    const account: Account = this.loginFormModel.value;
    account.password = Md5.hashStr(this.loginFormModel.value.password);
    this.utenteService.login(account).subscribe((utente: Utente) => {
          this.navController.navigateRoot('notizie');
          console.log(this.storage.get(UTENTE_STORAGE).then(value => {
            console.log(value);

          }));
          console.log(this.storage.get(AUTH_TOKEN).then(value => {
            console.log(value);

          }));
        },
        (err: HttpErrorResponse) => {
          if (err.status === 401) {
            console.error('login request error: ' + err.status);
            this.showLoginError();
          }
        });
  }

  async showLoginError() {
    const alert = await this.alertController.create({
      header: this.loginTitle,
      message: this.loginSubTitle,
      buttons: ['OK']
    });

    await alert.present();
  }


  private initTranslate() {
    this.translateService.get('LOGIN_ERROR_SUB_TITLE').subscribe((data) => {
      this.loginSubTitle = data;
    });
    this.translateService.get('LOGIN_ERROR_TITLE').subscribe((data) => {
      this.loginTitle = data;
    });
  }

    onSignup() {
        this.navController.navigateForward('signup');
    }
}

