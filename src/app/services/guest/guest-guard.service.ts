import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class GuestGuardService {

  constructor(
    private router: Router,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    if (
      sessionStorage.getItem('userDetails') !== null
    ) { return true; }
    this.router.navigateByUrl('/welcome');
    return false;
  }
}
