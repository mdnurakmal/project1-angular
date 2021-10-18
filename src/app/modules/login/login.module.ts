import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  Routes } from '@angular/router';
import { LoginService } from 'src/app/modules/shared/services/login.service';
import { SidebarComponent } from 'src/app/modules/sidebar/sidebar.component';
import { ChatComponent } from 'src/app/modules/chat/chat.component';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { LoginRoutingModule } from './login-routing.module';
import { NewchatComponent } from '../newchat/newchat.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [SidebarComponent, ChatComponent, LoginComponent,NewchatComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    PickerModule
    
  ]
  // providers: [
  //   {
  //     provide: ROUTES,
  //     useFactory: configBookHandlerRoutes,
  //     deps: [LoginService],
  //     multi: true
  //   }
  // ]
})


export class LoginModule implements OnInit{
  constructor() {
    console.log("hello from login module here");
   }
  ngOnInit(): void {
    console.log("hello from login module");
  }
}

export function configBookHandlerRoutes(authService: LoginService) {
  let routes: Routes = [];
  console.log("hello");
  // if (authService.isAuthorized()) {
  //   console.log("is authorized");
  //   routes = [
  //     {
  //       path: '', component: LoginComponent
  //     }
  //   ];
  // } else {
  //   console.log("is not authorized");
  //   routes = [
  //     {
  //       path: '', component: AppComponent
  //     }
  //   ];
  // }
  // return routes;
}