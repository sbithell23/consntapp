import { Injectable, Output, EventEmitter } from '@angular/core';
import { ToastService } from './toast.service';
import { AlertService } from './alert.service';
import { Constants } from './constants.service';

declare var window: any;
declare var cordova: any;

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  // @Output() refreshHomeNoteList: EventEmitter<any> = new EventEmitter(true);

  constructor(
    private toastService: ToastService,
    private alertService: AlertService,
  ) {
  }

  convertToLocal(utcDate, format?: string) {
    var utc = window.moment.utc(utcDate);
    var local = utc.local();
    if (format && format.trim() != "") return window.moment(local).format(format);
    return window.moment(local);
  }

  convertToUTC(localDate) {
    let date = new Date(localDate);
    date = window.moment.utc(date).format("llll");
    return date;
  }

  asyncLoop(iterations: number, func: Function, callback?: Function) {
    var index = 0;
    var done = false;
    var loop = {
      next: function () {
        if (done) {
          return;
        }
        if (index < iterations) {
          index++;
          func(loop);
        } else {
          done = true;
          if (callback) { callback("finish"); }
        }
      },
      iteration: function () {
        return index - 1;
      },
      break: function () {
        done = true;
        if (callback) { callback("break"); }
      }
    };
    loop.next();
    return loop;
  }

  ValidateEmail(email: string) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  getTimeStamp() {
    let date = new Date();
    return (date.getTime());
  }

  showMessage(options: IToastOption) {
    this.toastService.show(options);
  }

  APIErrorMessage() {
    this.showMessage({ message: Constants.API_ERROR_TEXT });
  }

  getMonthName(number) {
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    return months[number];
  }

  openInAppBrowser(url: string) {
    cordova.InAppBrowser.open(url, "_blank");
  }

  openNativeSetting(msg: string) {
    this.alertService.confirm({ message: msg, confirmBtnText: 'Open Settings' }).then((isConfirmed) => {
      if (isConfirmed) {
        cordova.plugins.diagnostic.switchToSettings(() => {
        }, console.error)
      }
    });
  }

  errorLog(message: string) {
    // console.log("erro logs: ", message);
    // if (!window.isMobileWeb) {
    //   Raven.captureException(message)
    // };
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
      if (callback) callback("not_supported");
    }
  }

  capitalizeFirstLetterOfWord(str: string) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(' ');
  }

  isDisposableEmail(email: string) {
    let spamEmails: string[] = [
      "guerrillamail",
      "getairmail",
      "dispostabl",
      "fakeinbox",
      "10minutemail",
      "jetable",
      "burnthespam",
      "yopmail",
      "spamgourmet",
      "deadaddress",
      "e4ward",
      "eyepaste",
      "fakemailgenerator",
      "shitmail",
      "mailcatch",
      "mailexpire",
      "mailimate",
      "nospammers",
    ];
    email = email.toLowerCase();
    var hostName = email.substring(email.lastIndexOf("@") + 1);
    hostName = hostName.split(".")[0];
    return spamEmails.includes(hostName) ? true : false;
  }

}
