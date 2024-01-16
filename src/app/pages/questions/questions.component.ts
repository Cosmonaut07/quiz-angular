import {Component, OnDestroy, OnInit} from '@angular/core';
import {APIService} from "../../services/API/api.service";
import {QuestionRepositoryService} from "../../services/API/questions/question-repository.service";
import {Subscription} from "rxjs";
import {Question, QuestionModel} from "../../models/question";
import {Route, Router} from "@angular/router";


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit, OnDestroy {
  public questions: Question[] = [];
  public questionsSub: Subscription | undefined;

  tableData = {
    columns: [
      {title: 'ID', objectKey: 'id'},
      {title: 'Question', objectKey: 'question'},
      {title: 'Type', objectKey: 'question_type_cast'},
    ],
    actions: [
      {title: 'Edit', action: 'onEditClick'},
      {title: 'Delete', action: 'onDeleteClick'},
    ],
    options: {
      autoIndex: true,
      indexTitle: 'Rank',
    }
  }

  constructor(
    private QuestionsRepository: QuestionRepositoryService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.fetchQuestions();
  }

  fetchQuestions() {
    this.questionsSub = this.QuestionsRepository.list().subscribe(res => {
      this.questions = res.data.map((question: any) => new QuestionModel(question));
    });
  }

  onBackClick() {
    this.router.navigate(['admin/dashboard']);
  }

  onAddClick() {
    this.router.navigate(['admin/questions/add']);
  }

  onTableAction(event: { method: string, param: any }) {
    // @ts-ignore
    this[event.method](event.param, this);
  }

  onEditClick(id: any, ref: QuestionsComponent | null = null) {
    if (!ref) ref = this;
    ref.router.navigate([
      'admin/questions/edit', id
    ])
  }

  onDeleteClick(id: any, ref: any = null) {
    if (!ref) ref = this;
    ref.QuestionsRepository.delete(id).subscribe((res: any) => {
      ref.fetchQuestions();
    })
  }

  ngOnDestroy() {
    this.questionsSub?.unsubscribe();
  }


}
