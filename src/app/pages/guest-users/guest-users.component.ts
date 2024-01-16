import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {GuestUserRepositoryService} from "../../services/API/guest-users/guest-user-repository.service";
import {GuestUser, GuestUserModel} from "../../models/guest-user";
import {QuizEntry, QuizEntryModel} from "../../models/quiz-entry";

@Component({
  selector: 'app-guest-users',
  templateUrl: './guest-users.component.html',
  styleUrls: ['./guest-users.component.css']
})
export class GuestUsersComponent implements OnInit {

  entries: QuizEntry[] = []

  tableData = {
    columns: [
      {title: 'ID', objectKey: 'id'},
      {title: 'Name', objectKey: 'name'},
      {title: 'Last Name', objectKey: 'last_name'},
      {title: 'Email', objectKey: 'email'},
      {title: 'Score', objectKey: 'score'},
      {title: 'Unanswered Questions', objectKey: 'unanswered_questions_amount'},
      {title: 'Submitted at', objectKey: 'submit_time'},
    ],
    actions: [
    ],
    options: {
      autoIndex: false,
      indexTitle: 'Rank',
    }
  }
  constructor(
    private router:Router,
    private guestRepo:GuestUserRepositoryService
  ) { }

  ngOnInit(): void {
    this.getGuests()
  }

  getGuests(){
    this.guestRepo.getGuestUsersEntries().subscribe(data=>{
     this.entries = data.data.map(
        (entries:any)=> new QuizEntryModel({
          id: entries.id,
          questions_amount: entries.questions_amount,
          question_type: entries.quiz_type,
          correct_answers_amount: entries.correct_answers_amount,
          score: entries.score,
          unanswered_questions_amount: entries.unanswered_questions_amount,
          name: entries.guest_user.name,
          email: entries.guest_user.email,
          last_name: entries.guest_user.last_name,
          submit_time: entries.submit_time,
          time_taken: entries.time_taken,
        })
      )
    })
  }

  onBackClick(){
    this.router.navigate(['admin/dashboard'])
  }

}
