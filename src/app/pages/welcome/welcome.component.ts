import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";
import {SettingService} from "../../services/settings/setting.service";
import {GuestUserRepositoryService} from "../../services/API/guest-users/guest-user-repository.service";
import {GuestUser, GuestUserModel} from "../../models/guest-user";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  public inputData: GuestUser = {
    email: '',
    name: '',
    last_name: ''
  }
  constructor(
    private router:Router,
    private guestUserRepo:GuestUserRepositoryService,
  ) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('userDetails') !== null) {
      this.router.navigate(['/home']);
    }
  }

  public onSubmit(form:any){
    //if success save in session and db
    let data = new GuestUserModel(this.inputData);
    this.guestUserRepo.saveGuestUser(data.transform()).subscribe((res)=>{
      let data :any = res.data;
      let guest = new GuestUserModel(data);
      sessionStorage.setItem('userDetails', JSON.stringify(guest));
      this.router.navigate(['/home']);

    });
    //then redirect to home
  }


}
