import { Injectable } from '@angular/core';
import {APIService} from "../api.service";

@Injectable({
  providedIn: 'root'
})
export class GuestUserRepositoryService extends APIService {

  public prefix = 'guest-users';

  public getGuestUser(id:any) {
    return this.simpleRequest('get',this.prefix+`/${id}`)
  }

  public saveGuestUser(d:any){
    return this.simpleRequest('post',this.prefix+'/create',d)
  }

  public getGuestUsersEntries(){
    return this.authorizedRequest('get',this.prefix+'/')
  }

  public getGuestsLeaderboard(){
    return this.simpleRequest('get',this.prefix+'/leaderboard')
  }

}
