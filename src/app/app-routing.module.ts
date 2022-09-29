import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from './authentication/guard/authenticated.guard';
  
const loginModule = () => import('@app/login/login.module').then(m => m.LoginModule);
const dataModule = () => import('@app/data/data.module').then(m => m.DataModule);

const routes: Routes = [
  { path: '', redirectTo: '/data', pathMatch: 'full' },
  { path: 'login', loadChildren: loginModule },
  { path: 'data', loadChildren: dataModule, canActivate: [AuthenticatedGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
