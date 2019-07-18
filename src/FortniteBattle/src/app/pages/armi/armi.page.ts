import {Component, OnInit} from '@angular/core';
import {AlertController, NavController} from '@ionic/angular';
import {ArmaService} from '../../../services/arma.service';
import {Arma} from '../../model/arma.model';

@Component({
  selector: 'app-armi',
  templateUrl: './armi.page.html',
  styleUrls: ['./armi.page.scss'],
})
export class ArmiPage implements OnInit {

  listarmi: Arma[] = null;
  listnomearma: string[] = [''];
  i = 1;

  selectedarma: Arma = {
    nome: '',
    rarita: '',
    image: '',
    tipo: '',
    caricatore: 0,
    danniCorpo: 0,
    danniTesta: 0,
    range: 0,
    reload: 0,
  };

  flag: boolean;
  weapon: any;
  trovato: boolean;
  rarita: any;
  check: boolean;
  flagw: boolean;
  flagimage: boolean;

  constructor(private navController: NavController,
              private armiservice: ArmaService,
              private  alertController: AlertController) {
  }

  ngOnInit() {
      this.flagimage = true;
      this.flagw = true;
      this.trovato = false;
      this.flag = true;

      this.armiservice.getAllArmi().subscribe(value => {
          this.listarmi = value;
          value.forEach(value1 => {
              if (!this.listnomearma.includes(value1.nome)) {
                  this.listnomearma.push(value1.nome);
              }
          });
          this.listnomearma.splice(this.listnomearma.indexOf(''), 1);
      });

  }

  public ChangeValue(): void {
    this.check = false;
    this.trovato = false;
    const name = this.weapon;
    const rarita = this.rarita;

    this.listarmi.forEach(value => {
        if (!this.trovato) {
          if (value.nome.includes(name) && value.rarita.includes(rarita)) {
            this.flag = false;
            this.selectedarma = value;
            this.trovato = true;
          }
      }
    });
    if (!this.trovato) {
        this.presentAlert();
    } else {
        this.flagimage = false;
    }
  }

    async  presentAlert() {
        const alert = await this.alertController.create({
            header: 'Attenzione!!',
            message: 'Arma non disponibile per la rarità scelta!',
            buttons: [
                {
                    text: 'OK'
                }]
        });
        return await alert.present();
    }

    public ChangeWeapValue(): void {
      this.flagw = false;
    }
}

