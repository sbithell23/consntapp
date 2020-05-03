import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  loading: any = false;
  constructor(
    private loadingCtrl: LoadingController,
  ) { }

  async showLoading(shouldAutoHide?: boolean, autoHideTimer?: number) {
    if (!autoHideTimer) {
      autoHideTimer = 2000;
    }
    this.loading = await this.loadingCtrl.create({
      // spinner:null
    });
    await this.loading.present();
    if (shouldAutoHide) {
      if (autoHideTimer) {
        setTimeout(() => { this.hideLoading() }, autoHideTimer);
      }
    }
  }

  hideLoading() {
    if (this.loading) {
      this.loading.dismiss();
    }
  }
}
