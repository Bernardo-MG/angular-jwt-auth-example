import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedOutGuard implements CanActivate {

  private homeUrl = '/';

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const logged = this.authenticationService.getUser().logged;
    let active;

    if (logged) {
      // Logged in
      // Redirect to home
      active = false;
      this.router.navigate([this.homeUrl]);
    } else {
      // Not logged in
      active = true;
    }

    return active;
  }

}
