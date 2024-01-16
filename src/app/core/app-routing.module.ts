import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import simpleRoute from "./simple-route";
import {HomeComponent} from "../pages/home/home.component";
import {WelcomeComponent} from "../pages/welcome/welcome.component";
import {SettingsComponent} from "../pages/settings/settings.component";
import {LoginComponent} from "../pages/login/login.component";
import {AuthGuardService} from "../services/auth/auth-guard.service";
import {DashboardComponent} from "../pages/dashboard/dashboard.component";
import {GuestGuardService} from "../services/guest/guest-guard.service";
import {QuestionsComponent} from "../pages/questions/questions.component";
import {QuestionAddComponent} from "../pages/questions/question-add/question-add.component";
import {QuestionEditComponent} from "../pages/questions/question-edit/question-edit.component";
import {QuizComponent} from "../pages/quiz/quiz.component";
import {GuestUsersComponent} from "../pages/guest-users/guest-users.component";
import {LeaderboardComponent} from "../pages/leaderboard/leaderboard.component";

const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'admin', redirectTo: '/login', pathMatch: 'full'},
    simpleRoute('welcome', WelcomeComponent),
    {
      path: '', canActivate: [GuestGuardService], children: [
        simpleRoute('home', HomeComponent),
        simpleRoute('settings', SettingsComponent),
        simpleRoute('quiz',QuizComponent),
        simpleRoute('leaderboards',LeaderboardComponent),
      ]
    },
    simpleRoute('login', LoginComponent),
    {
      path: 'admin',
      canActivate: [AuthGuardService],
      children: [
        simpleRoute('dashboard', DashboardComponent),
        simpleRoute('questions', QuestionsComponent),
        simpleRoute('questions/add', QuestionAddComponent),
        simpleRoute('questions/edit/:id', QuestionEditComponent),
        simpleRoute('guests', GuestUsersComponent),
      ]
    },
    simpleRoute('*', HomeComponent),
  ]
;


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
