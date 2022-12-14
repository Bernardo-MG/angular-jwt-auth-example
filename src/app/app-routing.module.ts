import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from './authentication/guard/logged-in.guard';
import { LoggedOutGuard } from './authentication/guard/logged-out.guard';

const loginModule = () => import('@app/login/login.module').then(m => m.LoginModule);
const dataModule = () => import('@app/data/data.module').then(m => m.DataModule);

const routes: Routes = [
  { path: '', redirectTo: '/data', pathMatch: 'full' },
  { path: 'login', loadChildren: loginModule, canActivate: [LoggedOutGuard] },
  { path: 'data', loadChildren: dataModule, canActivate: [LoggedInGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
