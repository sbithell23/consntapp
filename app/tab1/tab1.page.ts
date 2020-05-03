import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddRecordPage } from '../modals/add-record/add-record.page';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  user: IUser;
  isLoading: boolean = true;
  records: IRecord[] = [];

  constructor(
    private modalCtrl: ModalController,
    private userService: UserService
  ) {
    // this.addRecord();
  }

  ngOnInit() {
    this.getRecords();
  }

  async addRecord() {
    let modal = await this.modalCtrl.create({
      component: AddRecordPage
    });
    modal.present();
    modal.onDidDismiss().then((resp) => {
      if (resp && resp.data) {
        this.records = resp.data;
      }
    });
  }

  getRecords() {
    setTimeout(() => {
      this.user = this.userService.get();
      this.records = this.user.allRecords || [];
      this.isLoading = false;
    }, 2500);
  }

}
