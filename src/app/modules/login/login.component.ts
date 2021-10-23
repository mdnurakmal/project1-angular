import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DirectChatService } from '../shared/services/directChat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {

  recipient : string ="";
  constructor(public auth : AuthService, public directChatService : DirectChatService){

    this.directChatService.getVar().subscribe((data) => {
      this.recipient=data;
    } );
  }
  conversation;
  // sendMessage(message){
  //   this.webSocketAPI._send(message);
  // }

  onConversationSelected(conversation){
    this.conversation = conversation;
  }

  logout(): void {
    // Call this to log the user out of the application
    this.auth.logout({ returnTo: window.location.origin });
  }

}
