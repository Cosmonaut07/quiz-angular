import {QuestionChoice, QuestionChoiceModel} from "./question-choice";

export enum QuestionType {
  Binary= 1,
  MultipleChoice = 2,
}

export interface Question{
  id?: number;
  question: string;
  question_type: QuestionType;
  question_type_cast: string;
  choices: QuestionChoice[];
}

export class QuestionModel implements Question{
  id?: number;
  question: string;
  question_type: QuestionType;
  choices: QuestionChoiceModel[];
  question_type_cast : string;

  constructor({id, question, question_type, choices}: Question) {
    this.id = id;
    this.question = question;
    this.question_type = question_type;
    this.question_type_cast = QuestionType[question_type];
    this.choices = choices.map(
      (choice) => {
        return new QuestionChoiceModel({
          id: choice.id,
          choice: choice.choice,
          is_correct: choice.is_correct
        })
      }
    )

  }

  transform() {
    return {
      id: this.id,
      question: this.question,
      question_type: this.question_type,
      choices: this.choices.map(
        (choice: QuestionChoiceModel) => choice
      )
    }
  }

}
