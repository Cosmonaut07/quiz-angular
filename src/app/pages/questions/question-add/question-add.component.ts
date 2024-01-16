import {Component, OnInit} from '@angular/core';
import {QuestionModel, QuestionType} from "../../../models/question";
import {QuestionChoiceModel} from "../../../models/question-choice";
import {QuestionRepositoryService} from "../../../services/API/questions/question-repository.service";
import {Router} from "@angular/router";


export interface InputQuestionModel {
  question: string;
  type: QuestionType;
  correctIndex: number;
}

export interface InputAnswerModel {
  answer: string;
}

export interface UserInput {
  question: InputQuestionModel;
  answers: InputAnswerModel[];
}


@Component({
  selector: 'app-question-add',
  templateUrl: './question-add.component.html',
  styleUrls: ['./question-add.component.css']
})
export class QuestionAddComponent implements OnInit {

  _typeValue = 0;
  userInput: UserInput = {
    question: {
      question: '',
      type: QuestionType.Binary,
      correctIndex: 0,
    },
    answers: [
      {
        answer: '',
      },
      {
        answer: '',
      },
    ],
  }

  constructor(
    private questionsRepo: QuestionRepositoryService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  onTypeChange(event: any) {
    if (event) {
      this.userInput.question.type = QuestionType.MultipleChoice
      if (this.userInput.answers.length === 2) {
        this.userInput.answers.push({
          answer: '',
        })
      }
    } else {
      this.userInput.question.type = QuestionType.Binary
      if (this.userInput.answers.length === 3) {
        this.userInput.answers.pop()
      }
    }
  }

  toModel(inputs: UserInput) {
    return new QuestionModel(
      {
        question: inputs.question.question,
        question_type: inputs.question.type,
        question_type_cast: QuestionType[inputs.question.type],
        choices: inputs.answers.map(
          (answer: InputAnswerModel, key: number) => {
            return new QuestionChoiceModel({
              choice: answer.answer,
              is_correct: inputs.question.correctIndex == key ? 1 : 0
            })
          }
        )
      }
    )
  }

  onBackClick() {
    this.router.navigate(['/admin/questions']);
  }

  onSaveClick(form: any) {
    let data = this.toModel(this.userInput)
    this.questionsRepo.create(data.transform()).subscribe(
      res => {
        console.log(res)
        this.router.navigate(['/admin/questions']);
      }
    )
  }

}
