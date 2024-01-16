import {Question} from "./question";

export interface QuestionChoice {
  id?: number;
  choice: string;
  is_correct?: number;
}

export class QuestionChoiceModel implements QuestionChoice{
  id?: number;
  choice: string;
  is_correct?: number;

  constructor({id, choice,is_correct}: QuestionChoice) {
    this.id = id;
    this.choice = choice;
    this.is_correct = is_correct;
  }


  transfrom(){
    return {
      id: this.id,
      choice: this.choice,
      is_correct: this.is_correct,
    }
  }


}
