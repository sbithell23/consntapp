import { Component, ViewChild, OnInit } from '@angular/core';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  @ViewChild('tabs', { static: true, read: IonTabs }) private tabs: IonTabs;
  selectedTab: string;
  constructor(
  ) { }

  ngOnInit(): void {
    this.selectedTab = "tab1";
  }

  selecteTab(tab: string) {
    this.selectedTab = tab;
  }

  ionViewWillEnter() { }

}
