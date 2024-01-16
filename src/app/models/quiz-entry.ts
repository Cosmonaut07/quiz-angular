import {QuestionChoice, QuestionChoiceModel} from "./question-choice";
import {QuestionType} from "./question";


export interface QuizEntry {
  id?: number;
  questions_amount: string;
  question_type: QuestionType;
  correct_answers_amount: number;
  unanswered_questions_amount: number;
  score:number;
  name: string;
  email: string;
  last_name: string;
  submit_time: string;
  time_taken: string;

}

export class QuizEntryModel implements QuizEntry {
  id?: number;
  questions_amount: string;
  question_type: QuestionType;
  question_type_cast: string;
  correct_answers_amount: number;
  unanswered_questions_amount: number;
  score: number;
  name: string;
  email: string;
  last_name: string;
  submit_time: string;
  time_taken: string;


  constructor({id, questions_amount, question_type, correct_answers_amount,unanswered_questions_amount,score,name,email,last_name,submit_time,time_taken}: QuizEntry) {
    this.id = id;
    this.questions_amount = questions_amount;
    this.question_type = question_type;
    this.question_type_cast = QuestionType[question_type];
    this.correct_answers_amount = correct_answers_amount;
    this.unanswered_questions_amount = unanswered_questions_amount;
    this.score = score;
    this.name = name;
    this.email = email;
    this.last_name = last_name;
    this.submit_time = submit_time;
    this.time_taken= time_taken;

  }


}
