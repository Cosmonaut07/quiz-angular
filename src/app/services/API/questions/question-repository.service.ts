import { Injectable } from '@angular/core';
import {APIService} from "../api.service";
import {Question} from "../../../models/question";

@Injectable({
  providedIn: 'root'
})
export class QuestionRepositoryService extends APIService{

  public prefix = 'questions';

  public listByType(type: any){
    return this.authorizedRequest('get',this.prefix+`?type=${type}`)
  }

  public list(){
    return this.authorizedRequest('get',this.prefix)
  }

  public show(id: any){
    return this.authorizedRequest('get',this.prefix+`/${id}`);
  }

  public create(question: any){
    return this.authorizedRequest('post',this.prefix,question)
  }

  public update(question: any){
    return this.authorizedRequest('put',this.prefix+`/${question.id}`,question)
  }

  public delete(id: any){
    return this.authorizedRequest('delete',this.prefix+`/${id}`)
  }

}
