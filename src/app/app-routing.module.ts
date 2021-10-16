import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/login/components/login.component';
import { RedirectGuard } from './modules/redirectGuard';

const routes: Routes = [  {
  path: '',
  component: LoginComponent,

  // Protect a route by registering the auth guard in the `canActivate` hook
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [RedirectGuard]
})



export class AppRoutingModule { }
