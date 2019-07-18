import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {TorneoService} from '../../../services/torneo.service';
import {Torneo} from '../../model/torneo.model';


@Component({
  selector: 'app-classifica',
  templateUrl: './classifica.page.html',
  styleUrls: ['./classifica.page.scss'],
})
export class ClassificaPage implements OnInit {

  torneo: Torneo;
  check = true;

  listuser: string[] = ['', ''];
  listmatch: number[] = [10, 19];
  listpoints: number[] = [10, 13];
  listpremio: string[] = [];

    constructor(private navController: NavController, private torneoservice: TorneoService) { }

  ngOnInit() {
      this.torneo = this.torneoservice.getClickTorneo().value;
      if (this.check) {
          this.listpremio.push(this.torneo.premio1, this.torneo.premio2, this.torneo.premio3);
      }

      this.torneoservice.getClassifica(this.torneo.id).subscribe(value => {
          this.listuser = value.username;
          this.listmatch = value.match;
          this.listpoints = value.punti;
      });
  }

    doRefresh(event) {
        setTimeout(() => {
            this.check = false;
            this.ngOnInit();
            event.target.complete();
        }, 1000);
    }
}
