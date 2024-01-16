import {Component, OnDestroy, OnInit} from '@angular/core';
import {SettingService} from "../../services/settings/setting.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {QuestionType} from "../../models/question";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  public userInputs = {
    binary: true,
  }

  constructor(
    public Settings: SettingService,
    private router: Router,
  ) {
  }

  onSubmit(settingForm: NgForm) {
    this.Settings.setIsBinary(this.userInputs.binary)
    this.router.navigate(['/home']);
  }

}
