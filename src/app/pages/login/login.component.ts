import {Component, OnDestroy, OnInit} from '@angular/core';
import {APIService} from "../../services/API/api.service";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  public userInput = {
    email: '',
    password: ''
  }

  private loginSub!:Subscription;

  constructor(
    public API: APIService,
    public Auth: AuthService,
    private Router:Router
  ) {
  }

  ngOnInit(): void {
    if (this.Auth.isLoggedIn) {
      this.Router.navigate(['/admin/dashboard'])
    }
  }

  onSubmit(form: any) {
   this.loginSub =  this.API.login(this.userInput).subscribe((res) => {
        this.Auth.login(res);

      },
      (error) => {
        console.log('error', error);
      });
  }

  ngOnDestroy(): void {
    this.loginSub?.unsubscribe();
  }



}
