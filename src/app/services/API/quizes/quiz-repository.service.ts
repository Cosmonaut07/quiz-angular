import { Injectable } from '@angular/core';
import {APIService} from "../api.service";

@Injectable({
  providedIn: 'root'
})
export class QuizRepositoryService extends APIService{

  public prefix = 'quizes';

  public startQuiz(data: any){
    return this.simpleRequest('post',this.prefix+'/start',data);
  }

  public continueQuiz(data: any){
    return this.simpleRequest('post',this.prefix+'/continue',data);
  }

  public checkAnswer(data: any){
    return this.simpleRequest('post',this.prefix+'/check',data);
  }

  public endQuiz(data: any){
    return this.simpleRequest('post',this.prefix+'/submit',data);
  }

}
