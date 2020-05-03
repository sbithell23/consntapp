import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private nativeStorage: NativeStorage) { }

  setItem(key, value) {
    return new Promise((resolve, reject) => {
      this.nativeStorage.setItem(key, value)
        .then((resp) => {
          resolve(resp);
        },
          error => {
            if (!window.isMobileWeb) {
              if (error == "cordova_not_available") {
                localStorage.setItem(key, JSON.stringify(value));
                resolve();
              } else {
                console.error('Error storing item', JSON.stringify(value));
                reject();
              }
            }
            else {
              localStorage.setItem(key, JSON.stringify(value));
              resolve();
            }
          });
    });

  }

  getItem(key) {
    return new Promise((resolve, reject) => {
      this.nativeStorage.getItem(key).then((response) => {
        resolve(response);
      }, (error) => {
        if (!window.isMobileWeb) {
          if (error == "cordova_not_available") {
            let item = localStorage.getItem(key);
            if (item) {
              resolve(JSON.parse(item));
            }
            else {
              reject();
            }
          } else {
            reject();
          }
        }
        else {
          let item = localStorage.getItem(key);
          if (item) {
            resolve(JSON.parse(item));
          }
          else {
            reject();
          }
        }
      });
    });
  }

  removeDB(key) {
    return new Promise((resolve, reject) => {
      this.nativeStorage.remove(key).then((response) => {
        resolve(response);
      }, (error) => {
        if (!window.isMobileWeb) {
          if (error == "cordova_not_available") {
            localStorage.removeItem(key);
            resolve();
          }
        }
        else {
          localStorage.removeItem(key);
          resolve();
        }
      });
    });
  }

}
