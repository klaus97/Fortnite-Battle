import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-modifica-avatar',
  templateUrl: './modifica-avatar.page.html',
  styleUrls: ['./modifica-avatar.page.scss'],
})
export class ModificaAvatarPage implements OnInit {

  constructor(private navController: NavController, public events: Events) { }

  img: string[] = [
    '../../../assets/img/avatar/fortnite1.jpg',
    '../../../assets/img/avatar/fortnite2.jpg',
    '../../../assets/img/avatar/fortnite3.jpg',
    '../../../assets/img/avatar/fortnite4.jpg',
    '../../../assets/img/avatar/fortnite5.jpg',
    '../../../assets/img/avatar/fortnite6.jpg',
    '../../../assets/img/avatar/fortnite7.jpg',
    '../../../assets/img/avatar/fortnite8.jpg',
    '../../../assets/img/avatar/fortnite9.jpg',
  ];

  ngOnInit() {
  }

  onChangeAvatar(image) {
    this.events.publish('avatar:selected', image);
    this.navController.navigateBack('/modifica-profilo');
    this.events.unsubscribe('avatar:selected');
  }
}
