import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(error => {

      const isApiUrl = request.url.startsWith(environment.apiUrl);

      if (isApiUrl) {
        // It is a request to our API

        if (error.status === 401) {
          // Unauthenticated
          // Logs out
          this.authenticationService.logout();
          location.reload();
        }

        const errorMessage = error.error.message || error.statusText;
        return throwError(() => new Error(errorMessage));
      } else {
        // External API
        return throwError(() => error);
      }
    }))
  }

}
