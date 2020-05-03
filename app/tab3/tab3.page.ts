
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { Constants } from 'src/app/services/constants.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  user: IUser;
  isEditing: boolean = false;
  oldName: string;
  saveToLibraryImages: boolean;

  constructor(
    private navCtrl: NavController,
    private alertService: AlertService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.user = this.userService.get();
  }

  signoutProcess() {
    this.alertService.confirm({
      message: 'Are you sure you want to sign out?',
      confirmBtnText: 'Sign out',
      cancelBtnText: 'Cancel',
    }).then((isConfirmed) => {
      if (isConfirmed) {
        let user: IUser = {};
        user.isLoggedIn = false;
        this.userService.set(user);
        this.navCtrl.navigateRoot('registration');
      }
    });
  }

}
