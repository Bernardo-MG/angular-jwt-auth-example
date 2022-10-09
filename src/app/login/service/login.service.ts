import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@app/api/model/api-response';
import { LoginDetails } from '@app/authentication/model/login-details';
import { LoginRequest } from '@app/authentication/model/login-request';
import { AuthenticationContainer } from '@app/authentication/service/authentication-container.service';
import { environment } from '@environments/environment';
import { map, Observable, tap } from 'rxjs';

@Injectable()
export class LoginService {

  private loginUrl = environment.apiUrl + "/login";

  private rememberMe = false;

  constructor(
    private http: HttpClient,
    private authenticationContainer: AuthenticationContainer
  ) { }

  /**
   * Sets the status of the remember me option. If active the user will be stored on a succesful login.
   * 
   * @param remember remember me flag
   */
  public setRememberMe(remember: boolean) {
    this.rememberMe = remember;
  }

  /**
   * Logs in a user. This requires sending a login request. If the request fails it returns an
   * empty login details object, otherwise it returns the login details received from the API.
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
    this.authenticationContainer.reset();
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
   * Stores the received login details. This takes two steps, first it is stored in the local
   * subject. Then, if the 'remember me' option is enabled, it will be stored in the local storage.
   * 
   * @param loginDetails login details to store
   */
  private storeUser(loginDetails: LoginDetails) {
    this.authenticationContainer.setLoginDetails(loginDetails, this.rememberMe);
  }

}