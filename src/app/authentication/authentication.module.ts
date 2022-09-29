import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { JwtAuthenticationInterceptor } from './interceptor/jwt-authentication.interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtAuthenticationInterceptor, multi: true }
  ]
})
export class AuthenticationModule { }
