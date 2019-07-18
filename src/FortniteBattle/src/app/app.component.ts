import {Component, OnInit, SystemJsNgModuleLoader} from '@angular/core';
import {MenuController, NavController, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {TranslateService} from '@ngx-translate/core';
import {LinguaService} from '../services/lingua.service';
import {BehaviorSubject} from 'rxjs';
import {Utente} from './model/utente.model';
import {UtenteService} from '../services/utente.service';
import {Storage} from '@ionic/storage';
import {UTENTE_STORAGE} from './constants';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
    public utente$: BehaviorSubject<Utente>;

  constructor(private platform: Platform,
              private splashScreen: SplashScreen,
              private statusBar: StatusBar,
              private translate: TranslateService,
              private navController: NavController,
              private linguaService: LinguaService,
              private menuctrl: MenuController,
              private utenteService: UtenteService,
              private storage: Storage
  ) {
    this.initializeApp();
    this.menuctrl.swipeEnable(true);
  }
  ngOnInit(): void {
    this.utente$ = this.utenteService.getUtente();
    console.log(this.storage.get(UTENTE_STORAGE).then(value => {
        if (value == null) {
            this.navController.navigateRoot('login');
        }
        this.navController.navigateRoot('notizie');
    }));
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.initTranslate();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    const linguaPreferita = this.linguaService.getLinguaPreferita();
    this.translate.setDefaultLang(linguaPreferita);
    this.linguaService.getLinguaAttuale().subscribe((lingua: string) => {
      if (lingua != null) {
        this.translate.use(lingua);
      } else {
        this.translate.use(linguaPreferita);
        this.linguaService.updateLingua(linguaPreferita);
      }
    });
  }

 OnNews() {
      this.navController.navigateForward('notizie');
 }

 OnStats() {
      this.navController.navigateForward('statistiche');

 }

 OnWeapons() {
      this.navController.navigateForward('armi');
 }

 OnTournaments() {
      this.navController.navigateForward('tornei');

 }

 OnLogout() {
     this.utenteService.logout();
     this.menuctrl.close();
     this.navController.navigateRoot('login');
 }

    OnProfile() {
        this.navController.navigateForward('profilo');
    }
}
