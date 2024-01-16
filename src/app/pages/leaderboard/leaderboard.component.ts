import { Component, OnInit } from '@angular/core';
import { Router} from "@angular/router";
import {GuestUserRepositoryService} from "../../services/API/guest-users/guest-user-repository.service";
import {QuizEntryModel} from "../../models/quiz-entry";

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  leaderboardData: QuizEntryModel[] = [];
  tableData = {
    columns: [
      {title: 'Name', objectKey: 'name'},
      {title: 'Last Name', objectKey: 'last_name'},
      {title: 'Correct Answers', objectKey: 'correct_answers_amount'},
      {title: 'Time', objectKey: 'time_taken'},
      {title: 'Score', objectKey: 'score'},
      {title: 'Submitted at', objectKey: 'submit_time'},
    ],
    actions: [
    ],
    options: {
      autoIndex: true,
      indexTitle: 'Rank',
    }
  }
  constructor(
    private router:Router,
    private guestRepo:GuestUserRepositoryService
  ) { }

  ngOnInit(): void {
    this.getUsersList()
  }
  getUsersList(){
    this.guestRepo.getGuestsLeaderboard().subscribe(res=>{
     this.leaderboardData = res.data.map(
       (entry: any) =>new QuizEntryModel({
         id: entry.id,
         questions_amount: entry.questions_amount,
         question_type: entry.quiz_type,
         correct_answers_amount: entry.correct_answers_amount,
         score: entry.score,
         unanswered_questions_amount: entry.unanswered_questions_amount,
         name: entry.guest_user.name,
         email: entry.guest_user.email,
         last_name: entry.guest_user.last_name,
         submit_time: entry.submit_time,
         time_taken: entry.time_taken,
       })
     )
    })
  }


}
