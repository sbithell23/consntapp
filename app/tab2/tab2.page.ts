import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss', '../tab1/tab1.page.scss']
})
export class Tab2Page implements OnInit {
  user: IUser;
  allRecords: IRecord[] = [];
  copyRecords: IRecord[];
  searchText: string;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.user = this.userService.get();
    this.copyRecords = this.user.allRecords;
  }

  searchOnGetItems(ev: any) {
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.allRecords = _.filter(this.copyRecords, (record: IRecord) => {
        return (record.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
    else {
      this.allRecords = [];
    }
  }

  searchOnCancel() {
    this.allRecords = [];
  }

}
