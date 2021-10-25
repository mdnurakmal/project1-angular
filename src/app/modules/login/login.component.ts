import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { RxStompService } from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';
import { DirectChatService } from '../shared/services/directChat.service';
import { LoginService } from '../shared/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {

  recipient : string ="";
  constructor(private rxStompService: RxStompService,private loginService: LoginService,public auth : AuthService, public directChatService : DirectChatService){

    this.directChatService.getVar().subscribe((data) => {
      this.recipient=data;
    } );

  }
  conversation;

  onConversationSelected(conversation){
    this.conversation = conversation;
  }

  logout(): void {
    // Call this to log the user out of the application
    this.auth.logout({ returnTo: window.location.origin });
  }

}
