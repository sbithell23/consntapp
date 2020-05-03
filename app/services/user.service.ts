import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  static beyond: User;
  constructor(
    private storageService: StorageService,
  ) { }

  init() {
    return new Promise((resolve, reject) => {
      this.storageService.getItem("consnt").then((info) => {
        UserService.beyond = new User(info);
        resolve(UserService.beyond);
      }, (error) => {
        UserService.beyond = new User({
          userId: '',
          publicKey: '',
          privateKey: '',
          isRegistered: false,
          isLoggedIn: false
        });
        resolve(UserService.beyond);
      });
    });
  }

  worker(length: number, callback: Function, finalCallback?: Function) {
    if (typeof (Worker) !== "undefined") {
      var worker = new Worker('../assets/js/workers.js');
      if (length == 0) {
        if (finalCallback) finalCallback();
        return;
      }
      worker.postMessage(length);
      worker.onmessage = (e) => {
        if (callback) callback(e.data);
        if (e.data == length - 1) {
          if (finalCallback) finalCallback();
        }
      }
    } else {
      console.log('not_supported');
      if (callback) callback("not_supported");
    }
  }

  set(fields: IUser) {
    return new Promise((resolve, reject) => {
      let values = UserService.beyond;
      let size = Object.keys(fields).length;
      this.worker(size, (i: number) => {
        values[Object.keys(fields)[i]] = fields[Object.keys(fields)[i]]
      }, () => {
        UserService.beyond = values;
        this.storageService.setItem("consnt", values).then((resp) => {
          resolve("ok");
        }, () => {
          console.log("error in setting");
          reject();
        });
      });

      //   for (let f in fields) {
      //     values[f] = fields[f];
      //   }
      //   UserService.beyond = values;
      //   this.storageService.setItem("beyond", values).then((resp) => {
      //     resolve("ok");
      //   }, () => {
      //     console.log("error in setting");
      //     reject();
      //   });
    });
  }

  get() {
    // console.log("this._business in get ==>" + JSON.stringify(BusinessService._business));
    return UserService.beyond;
  }

}
