import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class SettingService {

  _isBinary: boolean = true;
  _isLoading = false;

  constructor() { }

  initSettings() {
    return new Promise((resolve, reject) => {
      this._isBinary = true;
      resolve(true);
    });
  }


  setIsBinary(type:boolean) {
    this._isLoading = true;
    this._isBinary = type;
    this._isLoading = false;
    console.log(type, 'TYPE');
  }


}
