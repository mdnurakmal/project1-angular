import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarComponent } from 'src/app/modules/sidebar/sidebar.component';
import { ChatComponent } from 'src/app/modules/chat/chat.component';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { LoginRoutingModule } from './login-routing.module';
import { NewchatComponent } from '../newchat/newchat.component';

@NgModule({
  declarations: [SidebarComponent, ChatComponent, LoginComponent,NewchatComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    PickerModule
  ]
})


export class LoginModule{
  constructor() {}

}
