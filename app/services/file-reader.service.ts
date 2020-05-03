import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { CommonService } from './common.service';

declare var cordova: any;
declare var window: any;

@Injectable({
  providedIn: 'root'
})
export class FileReaderService {

  constructor(
    private transfer: FileTransfer,
    private file: File,
    private commonService: CommonService
  ) { }

  // Pass URL of bucket
  downloadMediaToDirectory(url: string, extension: string, notEncode?: boolean, percetageCallBack?: any, fileTextCallback?: any) {
    // extension =====> txt, jpg , mov
    return new Promise((resolve, reject) => {
      let formate = this.commonService.getTimeStamp() + "." + extension;
      var targetPath = this.file.dataDirectory;
      const fileTransfer: FileTransferObject = this.transfer.create();
      fileTransfer.onProgress((progressEvent: ProgressEvent) => {
        var progress = parseInt(((progressEvent.loaded / progressEvent.total) * 100).toString());
        if (percetageCallBack) {
          percetageCallBack(progress);
        }
      })
      fileTransfer.download((notEncode ? url : encodeURI(url)), targetPath + formate)
        .then((entry) => {
          this.getFile(formate).then((result: IgetFile) => {
            if (fileTextCallback) { fileTextCallback(result); }
            this.deleteDirectoryFile(targetPath, formate);
            resolve(result.base64String);
          });
        }, (error) => {
          console.error('download fail: ' + JSON.stringify(error));
        });
    });
  }

  // Pass the name and formate of file in Library/Nocloud to get base64
  getFile(fileName: string, isreadAsDataURL?: boolean) {
    return new Promise((resolve, reject) => {
      this.file.resolveDirectoryUrl(this.file.dataDirectory).then((rootDir) => {
        this.file.getFile(rootDir, fileName, { create: false }).then((fileEntry) => {
          fileEntry.file(file => {
            var reader = new FileReader();
            reader.onloadend = (e: any) => {
              let result = e.target.result; // text content of the file
              resolve(
                {
                  'base64String': result,
                  'nativeUrl': fileEntry.nativeURL,
                  'localURL': file.localURL,
                  'fileName': fileName
                });
            };
            reader.onerror = (err) => {
              console.error('[reader error] ', JSON.stringify(err));
            }
            if (isreadAsDataURL) {
              reader.readAsDataURL(file);
            }
            else {
              reader.readAsText(file);
            }
          }, (err) => {
            console.error('[error getting files]: ', JSON.stringify(err));
          });
        }, (err) => {
          console.error('[error get file]', JSON.stringify(err));
        });
      }, (er) => {
        console.error('[error resolve file directory]', JSON.stringify(er));
      });
    });
  }

  getFileLocalURLl(fileName: string) {
    let _url = this.file.dataDirectory
    _url = _url.split('file://')[1];
    return _url + fileName;
  }

  getVideoNativeUrl(fileName: string) {
    return this.getfileDirectory() + fileName;
  }

  getAudioFileURLFromBase64(base64String: string, fileName?: string) {
    return new Promise((resolve, reject) => {
      var folderpath = this.file.dataDirectory;
      var filename: string = fileName || 'audio-' + this.commonService.getTimeStamp() + '.m4a';
      var block = base64String.split(";");
      // Get the content type
      var dataType = block[0].split(":")[1];// In this case "audio/mpeg"
      // get the real base64 content of the file
      var realData = block[1].split(",")[1];
      this.saveBase64AsAudioFile(folderpath, filename, realData, dataType).then((url: string) => {
        resolve(filename);
      }, () => {
        resolve(null);
      });
    });
  }

  private saveBase64AsAudioFile(folderpath, filename, content, contentType) {
    return new Promise((resolve, reject) => {
      // Convert the base64 string in a Blob
      var DataBlob = this.b64toBlob(content, contentType);
      window.resolveLocalFileSystemURL(folderpath, function (dir: any) {
        dir.getFile(filename, { create: true }, function (file: any) {
          file.createWriter(function (fileWriter) {
            fileWriter.write(DataBlob);
            resolve(file.nativeURL);
          }, function () {
            console.error('Unable to save file in path ' + folderpath);
            reject();
          });
        });
      });
    });
  }

  private b64toBlob(b64Data: any, contentType: any, sliceSize?: any) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;
    var byteCharacters = atob(b64Data);
    var byteArrays = [];
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);
      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  private getfileDirectory() {
    return window.Ionic.WebView.convertFileSrc(cordova.file.dataDirectory);
  }

  deleteDirectoryFile(path: string, fileName: string) {
    this.file.removeFile(path, fileName).then((resp) => { }, (err) => {
      console.log('file remove err: ', JSON.stringify(err));
    });
  }


  // For Video Play
  // Read File as Text
  // Than Sanitize Base64
  // return this._sanitizer.bypassSecurityTrustResourceUrl(v);

}





