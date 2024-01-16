import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";
import {map, Observable} from "rxjs";
import {APIResponseModel} from "../../models/API/APIResponseModel";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class APIService {

  protected apiUrl: string = environment.API_URL;
  protected headers: HttpHeaders = new HttpHeaders();

  constructor(
    protected HTTPClient: HttpClient,
    protected AUTH: AuthService,
    protected router:Router
  ) {
  }

  protected buildParams(data: any) {
    const params = new FormData();
    if (!data) {
      return params;
    }

    let k = Object.keys(data);
    for (let i in k) {
      params.append(k[i], data[k[i]]);
    }

    return params;
  }

  public authorizedRequest(method: string, url: string, body?: any) {
      let token = this.AUTH.getToken();
      console.log(token)
      !this.AUTH.isLoggedIn ? this.router.navigate(['/login']):
      this.headers = this.headers.append('Authorization', `Bearer ${token}`);
      return this.simpleRequest(method, url, body);
  }

  public simpleRequest(method: string, url: string, body?: any): Observable<APIResponseModel> {
    this.headers = this.headers.set('Content-Type', 'application/json');
    console.log(this.headers);
    return this.HTTPClient.request(method, this.apiUrl + url,
      {
        body: body,
        headers: this.headers,

      },
      ).pipe(
      map((res: any): APIResponseModel => {
        try {
          return new APIResponseModel(res);
        } catch (e) {
          console.log(['ERRORS EN', e]);
          let data = {
            statusCode: 0,
            message: e
          }
          return new APIResponseModel(data);
        }
      }));

  }



  public login(userData: any) {
    let params = this.buildParams(userData);
    return this.HTTPClient.post(this.apiUrl + 'auth/login', params);
  }


}
