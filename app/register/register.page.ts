import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { NavController, ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import * as _ from 'lodash';
import { ForgotPasswordPage } from '../modals/forgot-password/forgot-password.page';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  passwordType: string = 'password';
  isLoading: boolean = false;
  selectedPage: string = "login";
  userInfo: { name: string, email: string, password: string } = {
    name: '',
    email: '',
    password: '',
  };

  constructor(
    private commonService: CommonService,
    private navCtrl: NavController,
    private userService: UserService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() { }

  ionViewDidEnter() { }

  ionViewDidLeave() { }

  segmentChanged(event) {
    this.selectedPage = event.detail.value;
  }

  changePasswordType() {
    this.passwordType = this.passwordType == 'text' ? 'password' : 'text';
  }

  signUpUser() {
    if ($.trim(this.userInfo.name).length == 0) { this.commonService.showMessage({ message: 'Please enter your name' }) }
    else if ($.trim(this.userInfo.email).length == 0) { this.commonService.showMessage({ message: 'Please enter your Emaill' }) }
    else if (!this.commonService.ValidateEmail(this.userInfo.email)) { this.commonService.showMessage({ message: 'Please enter valid email address' }) }
    else if (this.commonService.isDisposableEmail(this.userInfo.email)) { this.commonService.showMessage({ message: 'You cannot use disposable email address' }) }
    else if ($.trim(this.userInfo.password).length < 8) { this.commonService.showMessage({ message: 'Password must be atleast 8 characters' }) }
    else {
      let user: IUser = {
        email: this.userInfo.email,
        name: this.userInfo.name,
        isLoggedIn: true
      }
      this.userService.set(user);
      this.navCtrl.navigateRoot('/tabs/tab1');
    }
  }

  loginUser() {
    if (!this.commonService.ValidateEmail(this.userInfo.email)) { this.commonService.showMessage({ message: 'Please enter valid email address' }) }
    else {
      let user: IUser = {
        email: this.userInfo.email,
        isLoggedIn: true
      }
      this.userService.set(user);
      this.navCtrl.navigateRoot('/tabs/tab1');
    }
  }


  async forgetPasswordModal() {
    const modal = await this.modalCtrl.create({
      component: ForgotPasswordPage
    });
    modal.present();
  }

}
