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

  constructor(
    private http: HttpClient
  ) { }

  public login(username: string, password: string): Observable<User> {
    const toUser = (status: LoginStatus) => this.loadUser(username, password, status);

    return this.http.post<ApiResponse<LoginStatus>>(this.loginUrl, { username, password })
      .pipe(map(response => response.content))
      .pipe(map(toUser));
  }

  public logout() {
    this.user = new User();
  }

  public getUser(): User {
    return this.user;
  }

  private loadUser(username: string, password: string, status: LoginStatus): User {
    let loggedUser;

    loggedUser = new User();
    if (status) {
      loggedUser.username = status.username;
      loggedUser.logged = status.logged;

      if (loggedUser.logged) {
        const token = window.btoa(username + ':' + password);
        loggedUser.token = token;
      }
    }

    this.user = loggedUser;
    return this.user;
  }

}