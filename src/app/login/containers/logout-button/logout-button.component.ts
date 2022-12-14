import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/authentication/service/authentication.service';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

/**
 * Logout button container. Smart component for handling the form. On click logs out.
 */
@Component({
  selector: 'logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.sass']
})
export class LogoutButtonComponent {

  private loginUrl = '/login';

  public logoutIcon = faRightFromBracket;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  public onLogout() {
    this.authenticationService.logout();
    this.router.navigate([this.loginUrl]);
  }

}
