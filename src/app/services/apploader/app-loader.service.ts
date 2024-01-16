import {Injectable} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {SettingService} from "../settings/setting.service";

@Injectable({
  providedIn: 'root'
})
export class AppLoaderService {

  constructor(
    public Auth: AuthService,
    public Settings: SettingService,
  ) {
  }

  Init() {
    return new Promise((resolve, reject) => {
      this.Settings.initSettings().then(r => {
        this.Auth.initUserInfo().then(r => {
          resolve(true);
        });
      })
    });
  }

}
