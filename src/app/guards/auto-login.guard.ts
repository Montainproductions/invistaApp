import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { filter, map, Observable, take } from 'rxjs';

@Injectable({providedIn: 'root'})

export class autoLoginGuard implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    //console.log('isAuthenticated:::', this.authenticationService.isAuthenticated);
    return this.authenticationService.isAuthenticated.pipe(
      filter(val => val !== null), take(1), map(isAuthenticated => {
        //console.log(isAuthenticated);
        if (isAuthenticated) {
          this.router.navigateByUrl('/home');
          return false;
        } else {return true;}
      })
    )
  }
};
