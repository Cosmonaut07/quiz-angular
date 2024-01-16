import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {QuestionRepositoryService} from "../../../services/API/questions/question-repository.service";
import {QuestionModel} from "../../../models/question";

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.css']
})
export class QuestionEditComponent implements OnInit, OnDestroy {
  id!: number;
  routeSub!: Subscription;
  question!: QuestionModel;
  currentIndex!: number;
  repoSub!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private questionsRepo: QuestionRepositoryService,
  ) {
  }

  ngOnInit(): void {
    this.getId();
  }

  getId(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params) => {
      this.id = parseInt(params['id'], 10);
      this.getData();
    });
  }

  getData(): void {
    this.repoSub = this.questionsRepo.show(this.id).subscribe((res) => {
      // @ts-ignore
      this.question = new QuestionModel(res.data);
      this.setCorrect(this.getCorrect())
      return this.question
    })
  }

  getCorrect() {
    console.log(this.question.choices)
    return this.question.choices.findIndex(choice => choice.is_correct);
  }

  setCorrect(index: number) {
    let correctIndex = this.getCorrect();
    this.currentIndex = correctIndex;
    if (correctIndex !== -1) {
      this.question.choices[correctIndex].is_correct = 0
      this.question.choices[index].is_correct = 1
    }
    this.currentIndex = index
  }

  onSaveClick(form: any) {
    console.log(this.question)
    this.questionsRepo.update(this.question.transform()).subscribe((res) => {
      this.route.navigate(['/admin/questions']);
    })
  }

  onBackClick(){
    this.route.navigate(['/admin/questions']);
  }

  ngOnDestroy() {
    this.routeSub?.unsubscribe()
    this.repoSub?.unsubscribe()
  }


}
