import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@app/api/model/api-response';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginStatus } from '../model/login-status';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  private loginUrl = environment.apiUrl + "/login";

  private userKey = 'user';

  private userSubject: BehaviorSubject<User>;

  private user: Observable<User>;

  constructor(
    private http: HttpClient
  ) {
    const localUser = localStorage.getItem(this.userKey);
    if (localUser) {
      const readUser = JSON.parse(localUser);
      this.userSubject = new BehaviorSubject<User>(readUser);
    } else {
      this.userSubject = new BehaviorSubject<User>(new User());
    }

    this.user = this.userSubject.asObservable();
  }

  public login(username: string, password: string): Observable<User> {
    return this.http.post<ApiResponse<LoginStatus>>(this.loginUrl, { username, password })
      .pipe(map(response => response.content))
      .pipe(map(r => this.loadUser(r)));
  }

  public logout() {
    this.userSubject.next(new User());
    localStorage.removeItem(this.userKey);
  }

  public getUser(): User {
    return this.userSubject.value;
  }

  public getUserObservable(): Observable<User> {
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

    this.userSubject.next(loggedUser);
    return this.getUser();
  }

}