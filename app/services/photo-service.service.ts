import { Injectable } from '@angular/core';
import { ActionSheetController, Platform } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileReaderService } from './file-reader.service';
import { CommonService } from './common.service';

declare var cordova;
declare var window;
declare var PDFReader;
declare var chooser;
@Injectable({
  providedIn: 'root'
})

export class PhotoService {
  lastImage: any;
  loading: any;
  PHOTO_QUALITY: number = 70;
  PHOTO_TARGET_WIDTH: any = 500;
  PHOTO_TARGET_HEIGHT: any = 500;
  serverLinks: any = [];
  awsBucket: any = [];
  constructor(
    private actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    private commonService: CommonService,
    private file: File,
    private fileReader: FileReaderService,
  ) { }

  // ActionSheet

  async openPhotActionSheet(base64Callback?: any, actionCallBack?: any) {
    let button: any = {
      buttons: []
    };
    button.buttons.push(
      {
        text: 'Browse Photo',
        handler: () => {
          if (actionCallBack) {
            actionCallBack('photo');
          }
          this.takePicture(0, base64Callback);
        }
      },
      {
        text: 'Take Photo',
        handler: () => {
          if (actionCallBack) {
            actionCallBack('photo');
          }
          this.takePicture(1, base64Callback);
        }
      },
      {
        text: 'Browse Audio',
        handler: () => {
          if (actionCallBack) {
            actionCallBack('audio');
          }
          this.browseAudio(base64Callback);
        }
      },
      {
        text: 'Browse Video',
        handler: () => {
          if (actionCallBack) {
            actionCallBack('video');
          }
          this.browseVideo(base64Callback);
        }
      },
    );

    button.buttons.push({
      text: 'Cancel',
      role: 'cancel',
      handler: () => { }
    });
    let actionSheet = await this.actionSheetCtrl.create(button);

    actionSheet.present();
  }


  // Images
  private takePicture(sourceType, callBack?: any) {
    let options: CameraOptions = {
      quality: this.PHOTO_QUALITY,
      sourceType: sourceType,
      saveToPhotoAlbum: false,  //Constants.saveToPhotoAlbum,
      correctOrientation: true,
      allowEdit: true,  //isEditable ? isEditable : false,
      // destinationType: this.camera.DestinationType.DATA_URL
    };
    this.camera.getPicture(options).then((result?: any) => {
      if (callBack) {
        var currentName = result.substr(result.lastIndexOf('/') + 1);
        var correctPath = result.substr(0, result.lastIndexOf('/') + 1);
        var fileFormate = currentName.split(".")[1];
        let newFileName = this.commonService.getTimeStamp() + "." + fileFormate;
        this.copyFileToLocalDir(correctPath, currentName, newFileName).then((fileName: string) => {
          this.fileReader.getFile(fileName, true).then((resp: IgetFile) => {
            resp.nativeUrl = this.getfileDirectory() + fileName;
            callBack(resp);
          });
        });
        // let imagePath = 'data:image/png;base64,' + base64;
        // base64Callback([imagePath]);
      }
    }, (err) => {
      console.log('in error of camera take pic: ' + err);
      if (callBack) {
        callBack(null);
      }
    });
  }

  async browseAudio(callback?: any) {
    const file = await chooser.getFile();
    let result = file.uri;
    var currentName: string = result.substr(result.lastIndexOf('/') + 1);
    var correctPath = result.substr(0, result.lastIndexOf('/') + 1);
    var fileFormate = currentName.split(".")[1];
    let newFileName = this.commonService.getTimeStamp() + "." + fileFormate;
    currentName = currentName.replace(/%20/g, ' ');
    this.copyFileToLocalDir(correctPath, currentName, newFileName).then((fileName: string) => {
      this.fileReader.getFile(fileName, true).then((resp: IgetFile) => {
        resp.nativeUrl = this.getfileDirectory() + fileName;
        if (callback) {
          callback(resp);
        }
      }, (err) => {
        console.log('err getting base64:  ', err);
      });
    }, (err) => {
      console.log('err in copy:  ', err);
    });
  }

  // Videos
  private browseVideo(base64Callback?: any) {
    let options: CameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      mediaType: this.camera.MediaType.VIDEO
    };
    this.camera.getPicture(options).then((result?: string) => {
      if (base64Callback && result) {
        var correctPath = result.substr(0, result.lastIndexOf('/') + 1);
        correctPath = correctPath.replace('/private', '');
        var currentName = result.substr(result.lastIndexOf('/') + 1);
        var fileFormate = currentName.split(".")[1];
        fileFormate = fileFormate[fileFormate.length - 1];
        fileFormate = 'mp4';
        let newFileName = this.commonService.getTimeStamp() + "." + fileFormate;
        this.copyFileToLocalDir(correctPath, currentName, newFileName).then((fileName: string) => {
          this.fileReader.getFile(fileName, true).then((resp: IgetFile) => {
            resp.nativeUrl = this.getfileDirectory() + fileName;
            base64Callback(resp);
          });
        });
      }
    }, (err) => {
      if (base64Callback) {
        base64Callback(null);
      }
    });
  }

  private copyFileToLocalDir(namePath: string, currentName: string, newFileName: string) {
    return new Promise((resolve, reject) => {
      this.file.moveFile(namePath, currentName, this.file.dataDirectory, newFileName).then((resp) => {
        resolve(newFileName);
      }, error => {
        reject();
      });
    })
  }

  public getfileDirectory() {
    return window.Ionic.WebView.convertFileSrc(cordova.file.dataDirectory);
  }

}