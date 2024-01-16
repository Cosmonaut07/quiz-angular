import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, NgForm} from "@angular/forms";
import { AppComponent } from './app.component';
import {AppRoutingModule} from "./core/app-routing.module";
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { LoginComponent } from './pages/login/login.component';
import { SettingsComponent } from './pages/settings/settings.component';
import {HttpClientModule} from "@angular/common/http";
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LeaderboardComponent } from './pages/leaderboard/leaderboard.component';
import {SettingService} from "./services/settings/setting.service";
import {AppLoaderService} from "./services/apploader/app-loader.service";
import { QuestionsComponent } from './pages/questions/questions.component';
import { QuestionAddComponent } from './pages/questions/question-add/question-add.component';
import { ListItemComponent } from './components/list/list-item/list-item.component';
import {ListComponent} from "./components/list/list.component";
import { FooterComponent } from './components/footer/footer.component';
import { AnswerCardFormComponent } from './components/answer-card-form/answer-card-form.component';
import { QuestionEditComponent } from './pages/questions/question-edit/question-edit.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import {QuizService} from "./services/quiz/quiz.service";
import { ChangeBgDirective } from './directives/change-bg.directive';
import { GuestUsersComponent } from './pages/guest-users/guest-users.component';
import { DetailedListComponent } from './components/detailed-list/detailed-list.component';
import { DetailedListItemComponent } from './components/detailed-list/detailed-list-item/detailed-list-item.component';
import { ReplacePipe } from './pipes/replace.pipe';
import { TableComponent } from './components/table/table.component';

export function appInitializer(appInitService: AppLoaderService) {
  return async (): Promise<any> => {
    return await appInitService.Init();
  };
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    WelcomeComponent,
    LoginComponent,
    SettingsComponent,
    DashboardComponent,
    LeaderboardComponent,
    QuestionsComponent,
    QuestionAddComponent,
    ListItemComponent,
    ListComponent,
    FooterComponent,
    AnswerCardFormComponent,
    QuestionEditComponent,
    QuizComponent,
    ChangeBgDirective,
    GuestUsersComponent,
    DetailedListComponent,
    DetailedListItemComponent,
    ReplacePipe,
    TableComponent,

  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      deps: [AppLoaderService],
      multi: true,
    },
    NgForm,
    AppLoaderService,
    QuizService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
