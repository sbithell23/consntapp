import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import * as $ from 'jquery';

// Interface
import '../app/interfaces/common';
import '../app/interfaces/window';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from './services/user.service';

declare var moment: any;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translateService: TranslateService,
    private userService: UserService,
    private navCtrl: NavController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.translateService.setDefaultLang('en');
      window.moment = moment;
      window.isMobileWeb = this.platform.is('mobileweb');
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.userService.init().then((user: IUser) => {
        if (user.isLoggedIn) {
          this.navCtrl.navigateRoot('tabs'); 
        }
        else {
          this.navCtrl.navigateRoot('registration');
        }
      }, () => {
        this.navCtrl.navigateRoot('registration');
        console.log('in init catch');
      });
    }).catch((err) => {
      console.error('on app reader catch', JSON.stringify(err));
    });
  }
}
