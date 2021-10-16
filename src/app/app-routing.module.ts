import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';

import { RedirectGuard } from './modules/redirectGuard';

const routes: Routes = [  {
  path: '', loadChildren: () => import('src/app/modules/login/login.module').then(mod => mod.LoginModule),

  // Protect a route by registering the auth guard in the `canActivate` hook
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [RedirectGuard]
})



export class AppRoutingModule { }
