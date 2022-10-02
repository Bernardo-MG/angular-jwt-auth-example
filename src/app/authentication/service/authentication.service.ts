import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@app/api/model/api-response';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginStatus } from '../model/login-status';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  private loginUrl = environment.apiUrl + "/login";

  private user: User = new User();

  private userKey = 'user';

  constructor(
    private http: HttpClient
  ) {
    const localUser = localStorage.getItem(this.userKey);
    if (localUser) {
      this.user = JSON.parse(localUser);
    }
  }

  public login(username: string, password: string): Observable<User> {
    return this.http.post<ApiResponse<LoginStatus>>(this.loginUrl, { username, password })
      .pipe(map(response => response.content))
      .pipe(map(r => this.loadUser(r)));
  }

  public logout() {
    this.user = new User();
  }

  public getUser(): User {
    return this.user;
  }

  private loadUser(status: LoginStatus): User {
    let loggedUser;

    loggedUser = new User();
    if (status) {
      loggedUser.username = status.username;
      loggedUser.logged = status.logged;
      loggedUser.token = status.token;

      if (loggedUser.logged) {
        localStorage.setItem(this.userKey, JSON.stringify(loggedUser));
      } else {
        localStorage.removeItem(this.userKey);
      }
    }

    this.user = loggedUser;
    return this.user;
  }

}