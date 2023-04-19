import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconsModule } from '@app/shared/icons/icons.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthenticationModule } from '../authentication/authentication.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginComponent } from './containers/login/login.component';
import { LogoutButtonComponent } from './containers/logout-button/logout-button.component';
import { LoginRoutingModule } from './login-routing.module';
import { LoginService } from './service/login.service';



@NgModule({
  declarations: [
    LoginFormComponent,
    LogoutButtonComponent,
    LoginComponent
  ],
  imports: [
    LoginRoutingModule,
    FontAwesomeModule,
    AuthenticationModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IconsModule
  ],
  exports: [
    LogoutButtonComponent
  ],
  providers: [
    LoginService
  ]
})
export class LoginModule { }
