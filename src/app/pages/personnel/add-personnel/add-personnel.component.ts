import { Component, OnInit } from '@angular/core';
import { MenuController , ToastController, ActionSheetController, Platform , ModalController } from '@ionic/angular';

import { User } from './../../../models/user.model';

@Component({
  selector: 'app-add-personnel',
  templateUrl: './add-personnel.component.html',
  styleUrls: ['./add-personnel.component.scss'],
})
export class AddPersonnelComponent implements OnInit {

	public user: User = new User();

  constructor(
  	private modalController: ModalController
  ) { }

  ngOnInit() {}

  closeModal(){
      this.modalController.dismiss(0);
    }

}
