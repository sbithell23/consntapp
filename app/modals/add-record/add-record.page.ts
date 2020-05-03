import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { CommonService } from 'src/app/services/common.service';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { PhotoService } from 'src/app/services/photo-service.service';

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.page.html',
  styleUrls: ['./add-record.page.scss'],
})
export class AddRecordPage implements OnInit {

  user: IUser;
  record: IRecord = {
    images: [], audios: [], videos: []
  };
  isSaving: boolean = false;
  constructor(
    private modalCtrl: ModalController,
    private userService: UserService,
    private commonService: CommonService,
    private datePicker: DatePicker,
    private photoService: PhotoService
  ) { }

  ngOnInit() {
    this.user = this.userService.get();
  }

  goBack(records?: any) {
    this.modalCtrl.dismiss(records);
  }

  selectFile() {
    let media: IMediaType = {};
    this.photoService.openPhotActionSheet((file: IgetFile) => {
      media.url = file.nativeUrl;
      if (media.type == 'photo') {
        this.record.images.push(media);
      }
      else if (media.type == 'audio') {
        media.base64String = file.base64String;
        this.record.audios.push(media);
      }
      else if (media.type == 'video') {
        this.record.videos.push(media);
        console.log('media data: ', JSON.stringify(this.record.videos));
      }
    },
      (type: string) => {
        media.type = type;
      });
  }

  saveRecord() {
    this.record.dateAdded = window.moment().format('llll');
    if (window.isMobileWeb) {
      this.record.expiryDate = window.moment().format('llll');
    }
    if ($.trim(this.record.name).length == 0) {
      this.commonService.showMessage({ message: "Please enter name" });
    }
    else if ($.trim(this.record.purpose).length == 0) {
      this.commonService.showMessage({ message: "Please enter purpose" });
    }
    else if (!this.record.expiryDate) {
      this.commonService.showMessage({ message: "Please select expiry date" });
    }
    else {
      this.isSaving = true;
      let records: IRecord[] = this.user.allRecords || [];
      records.push(this.record);
      this.userService.set({
        allRecords: records
      }).then(() => {
        this.isSaving = false;
        this.goBack(records);
      })
    }
  }

  selectDate() {
    // let date = new Date();
    // date.setFullYear(1990, 0, 1);
    this.datePicker.show({
      date: new Date(),
      mode: 'datetime',
      allowOldDates: false,
      minDate: new Date(),
    }).then(
      (date: any) => {
        if (date) {
          this.record.expiryDate = window.moment(date).format('llll');
        }
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  removeMedia(index: number, media: string) {
    if (index == -1 || !media) {
      return;
    }

    if (media == 'image') {
      this.record.images.splice(index, 1);
    }

    else if (media == 'audio') {
      this.record.audios.splice(index, 1);
    }
  }

}
