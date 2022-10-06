import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@app/api/model/api-response';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LoginDetails } from '../model/login-details';
import { LoginRequest } from '../model/login-request';

/**
 * Authentication service. Handles login and logout operations.
 * 
 * Login requires sending a request to the login endpoint. While logout just requires cleaning up
 * the local context.
 * 
 * ## Remember me
 * 
 * This functionality allows storing the user into the local context, and recovering it automatically.
 * All this requires is setting the rememberMe flag to true. The service will take care of the rest.
 * 
 * This is donde just by storing the user into the local context in a successful login. If said
 * login was successful. The service will always try to read a user from the local context when it
 * starts. Also any user in the local context will be removed on a logout.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  private loginUrl = environment.apiUrl + "/login";

  private userKey = 'user';

  private userSubject: BehaviorSubject<LoginDetails>;

  private user: Observable<LoginDetails>;

  private rememberMe = false;

  constructor(
    private http: HttpClient
  ) {
    this.userSubject = this.readUserFromLocal();
    this.user = this.userSubject.asObservable();
  }

  /**
   * Logs in a user. This requires sending a login request. If the request fails it returns an
   * empty user, otherwise it returns the user.
   * 
   * If the 'remember me' option is active, the user will be stored in the local storage.
   * 
   * @param request login request
   * @returns the user resulting from the login
   */
   public login(request: LoginRequest): Observable<LoginDetails> {
    return this.http.post<ApiResponse<LoginDetails>>(this.loginUrl, request)
      .pipe(map(response => response.content))
      .pipe(map(response => this.toUser(response)))
      .pipe(tap(user => this.storeUser(user)));
  }

  /**
   * Logs out the current user.
   */
  public logout() {
    // Store empty user
    this.userSubject.next(new LoginDetails());

    // Clear local storage
    localStorage.removeItem(this.userKey);
  }

  /**
   * Returns the user currently in session.
   * @returns the user currently in session
   */
  public getUser(): LoginDetails {
    return this.userSubject.value;
  }

  /**
   * Returns the user currently in session as an observable. This allows reacting to new logins or logouts.
   * 
   * @returns the user currently in session as an observable
   */
  public getUserObservable(): Observable<LoginDetails> {
    return this.user;
  }

  /**
   * Sets the status of the remember me option. If active the user will be stored on a succesful login.
   * 
   * @param remember remember me flag
   */
  public setRememberMe(remember: boolean) {
    this.rememberMe = remember;
  }

  /**
   * Reads the user from the local storage. This allows recovering users stored as part of the 'remember me'
   * functionality.
   * 
   * @returns the user stored in the local storage as part of the 'remember me'
   */
  private readUserFromLocal(): BehaviorSubject<LoginDetails> {
    let subject: BehaviorSubject<LoginDetails>;

    // If the user was stored, load it
    const localUser = localStorage.getItem(this.userKey);
    if (localUser) {
      // User found in local storage
      const readUser = JSON.parse(localUser);
      subject = new BehaviorSubject<LoginDetails>(readUser);
    } else {
      // User not found
      // Use default user
      subject = new BehaviorSubject<LoginDetails>(new LoginDetails());
    }

    return subject;
  }

  /**
   * Maps the login status into a user.
   * 
   * @param status status to map
   * @returns user generated from the login status
   */
  private toUser(status: LoginDetails): LoginDetails {
    let loggedUser;

    loggedUser = new LoginDetails();
    if (status) {
      // Received data
      loggedUser.username = status.username;
      loggedUser.logged = status.logged;
      loggedUser.token = status.token;
    }

    return loggedUser;
  }

  /**
   * Stores the received user. This takes two steps, first it is stored in the local subject. Then, if
   * the 'remember me' option is enabled, it will be stored in the local storage.
   * 
   * @param user user to store
   */
  private storeUser(user: LoginDetails) {
    this.userSubject.next(user);

    if (this.rememberMe) {
      // Store user
      localStorage.setItem(this.userKey, JSON.stringify(user));
    }
  }

}