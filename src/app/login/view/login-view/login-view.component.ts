import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@app/authentication/service/authentication.service';
import { LoginUser } from '@app/login/model/login-user';

@Component({
  selector: 'login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.sass']
})
export class LoginViewComponent implements OnInit {

  public loading = false;

  public failed = false;

  private returnUrl: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  public onLogin(login: LoginUser) {
    this.authenticationService.login(login.username, login.password)
      .subscribe({
        next: user => {
          console.log(user)
          this.failed = !user.logged;
          this.loading = false;
          if (user.logged) {
            this.router.navigate([this.returnUrl]);
          }
        },
        error: error => {
          this.failed = true;
          this.loading = false;
        }
      });
  }

}
