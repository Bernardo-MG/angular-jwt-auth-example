import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from './core/authentication/guard/logged-in.guard';
import { LoggedOutGuard } from './core/authentication/guard/logged-out.guard';
import { CenteredLayoutComponent } from './core/views/containers/centered-layout/centered-layout.component';
import { HeaderLayoutComponent } from './core/views/containers/header-layout/header-layout.component';

const loginModule = () => import('@app/core/login/login.module').then(m => m.LoginModule);
const businessModule = () => import('@app/business/business.module').then(m => m.BusinessModule);

const routes: Routes = [
  { path: '', redirectTo: '/business', pathMatch: 'full' },
  // Login
  {
    path: 'login',
    component: HeaderLayoutComponent,
    canActivate: [LoggedOutGuard],
    children: [
      {
        path: '', component: CenteredLayoutComponent,
        children: [
          {
            path: '', loadChildren: loginModule
          }
        ]
      }
    ]
  },
  // Business
  {
    path: 'business',
    component: HeaderLayoutComponent,
    canActivate: [LoggedInGuard],
    children: [
      { path: '', loadChildren: businessModule }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
