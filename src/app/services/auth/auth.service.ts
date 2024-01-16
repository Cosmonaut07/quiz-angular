import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {User} from "../../models/user";
import {Router} from "@angular/router";
import {APIService} from "../API/api.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedIn = false;
  protected token: string | null | undefined;

  constructor(
    private router: Router,
    private httpClient: HttpClient,
  ) {
    this.setState();
  }

  login(data: any) {
    if (data.success) {
      if (data.data.access_token) {
        this.saveToken(data.data.access_token);
        this.setState();
        this.router.navigate(['/admin/dashboard'])
      }

    }
  }

  getToken() {
    return this.token = localStorage.getItem('access_token');

    // return this.token = localStorage.getItem('access_token');
  }

  saveToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  setState() {
    this.getToken();
    this.token ? this.isLoggedIn = true : this.isLoggedIn = false;
  }

  logout() {
    localStorage.removeItem('access_token');
    this.setState();
  }

  checkToken() {
    this.token = localStorage.getItem('access_token');
    if (this.token) {
      this.httpClient.get('http://127.0.0.1:8000/api/ping', {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)}).subscribe(
        (res: any) => {
          console.log(res)
        })
    }
  }

  initUserInfo() {
    return new Promise((resolve, reject) => {
      this.checkToken();
      resolve(this.isLoggedIn);
    });
  }
}
