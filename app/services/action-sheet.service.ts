import { Injectable } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ActionSheetService {

  constructor(
    private actionSheet: ActionSheetController
  ) { }


  openSheet(options: ISheetOptions) {
    return new Promise(async (resolve, reject) => {
      if (!options.buttons || !options.buttons.length) { reject("INVALID_BUTTONS"); return; }
      let buttons = [];
      for (let button of options.buttons) {
        if (!button) { reject("INVALID_BUTTON"); return; }
        if (options.translateButtons) button.text = button.text;
        buttons.push({
          text: button.text,
          icon: button.icon,
          handler: () => {
            let data = { action: button.returnText };
            resolve(data);
          }
        })
      }

      if (options.showCancelButton) {
        buttons.push({
          text: 'Cancel',
          role: "cancel",
          handler: () => {
          }
        })
      }

      let actionSheet = await this.actionSheet.create({
        header: options.title || '', 
        buttons: buttons,
        backdropDismiss: true,
        cssClass: "custom-sheet"
      });
      await actionSheet.present();
    })
  }


}
