import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  /**
   * Constructor
   * @param router The router object
   * @param Auth
   */
  constructor(
    private router: Router,
    private Auth: AuthService
  ) { }
  /**
   * Can activate function
   * @param next The activated route snapshot object
   * @param state The router state snapshot object
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    if (
      this.Auth.isLoggedIn &&
      localStorage.getItem('access_token')
    ) { return true; }
    localStorage.removeItem('access_token');
    this.router.navigateByUrl('/login');
    return false;
  }
}
