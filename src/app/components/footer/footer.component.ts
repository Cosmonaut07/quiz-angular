import { Component, OnInit } from '@angular/core';
import {SettingService} from "../../services/settings/setting.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(
    private setttings: SettingService
  ) { }

  ngOnInit(): void {
  }

  getGameMode(){
    return this.setttings._isBinary ? 'Binary' : 'Multiple Choice';
  }

}
