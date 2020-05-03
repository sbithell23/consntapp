import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast.service';
import { AlertService } from 'src/app/services/alert.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  userEmail: string;
  isSending: boolean = false;
  constructor(
    private modalCtrl: ModalController,
    private toastService: ToastService,
    private alertService: AlertService,
    private commonService: CommonService,
    // private firebaseService: FirebaseService
  ) { }

  ngOnInit() { }

  goBack() {
    this.modalCtrl.dismiss();
  }

  resetPassword() {
    // if (!this.commonService.ValidateEmail(this.userEmail)) {
    //   this.toastService.show({ message: "Please enter a valid email" })
    // } else {
    //   this.isSending = true;
    //   this.firebaseService.resetPasswordEmail(this.userEmail).then(() => {
    //     this.isSending = false;
    //     this.alertService.show(`Email with Reset Password link has been sent to ${this.userEmail}`).then(() => {
    //       this.goBack();
    //     })
    //   }, (err) => {
    //     this.isSending = false;
    //     this.toastService.show({ message: err.message });
    //   });
    // }
  }


}
