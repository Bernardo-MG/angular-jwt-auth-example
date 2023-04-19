import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthenticationModule } from './authentication/authentication.module';
import { LoginModule } from './login/login.module';
import { ViewsModule } from './views/views.module';



@NgModule({
  imports: [
    CommonModule,
    AuthenticationModule,
    LoginModule,
    ViewsModule
  ],
  exports: [
    CommonModule,
    AuthenticationModule,
    LoginModule,
    ViewsModule
  ]
})
export class CoreModule { }
