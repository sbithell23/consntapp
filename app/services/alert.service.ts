import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  userInfo: IUser;
  constructor( 
    private alertController: AlertController,
    private beyondService: UserService
  ) { }
  async show(message: string, header?: string) {
    const alert = await this.alertController.create({
      header: header || '',
      subHeader: '',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  confirm(options: confirmAlerts) {
    return new Promise(async (resolve, reject) => {
      let alert = await this.alertController.create({
        header: options.header,
        message: options.message,
        buttons: [
          {
            text: options.cancelBtnText || 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              resolve(false);
            }
          }, {
            text: options.confirmBtnText || 'Okay',
            handler: () => {
              resolve(true);
            }
          }
        ]
      });
      await alert.present();
    });
  }

}
