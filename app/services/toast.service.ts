import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    toaster: any;
    constructor(
        private toastCtrl: ToastController
    ) { }

    show(options?: IToastOption) {
        return new Promise(async (resolve?: any, reject?: any) => {
            /*options{
                message: message
                duration: milliseconds
                position: top,bottom,center
             } */

            if (options && options.message) {
                let duration = 4000;
                if (options.duration) {
                    duration = options.duration;
                } else if (options.duration == '') {
                    duration = null;
                }
                this.toaster = await this.toastCtrl.create({
                    message: options.message,
                    duration: duration,
                    position: options ? options.position ? options.position : 'bottom' : 'bottom',
                    cssClass: 'my-toast-wrapper'
                });

                this.toaster.onDidDismiss((data, role) => {
                    if (role == 'messageClick') {
                        resolve(data);
                    } else {
                        reject();
                    }
                });

                this.toaster.present();
            }
            else {
                console.error('Pass object in toast');
            }
        });
    }
}
