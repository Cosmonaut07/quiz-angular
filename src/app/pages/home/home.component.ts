import {Component, OnDestroy, OnInit} from '@angular/core';
import {SettingService} from "../../services/settings/setting.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    public Settings:SettingService,
    private router:Router
  ) { }

  ngOnInit(): void {

  }

  onStart(){
    this.router.navigate(['/quiz']);
  }

  getGameType(){
    return this.Settings._isBinary ? 'Multiple Choice' : 'Binary';
  }

  onStartQuizClick(){
    this.router.navigate(['/quiz'])
  }



}
