import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DirectChatService } from '../shared/services/directChat.service';
import { WebSocketAPI } from '../shared/services/WebSocketAPI.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {

  recipient : string ="";
  constructor(public auth : AuthService,public webSocketAPI : WebSocketAPI, public directChatService : DirectChatService){
    console.log("inside login component ")

    this.webSocketAPI._connect();

    this.directChatService.getVar().subscribe((data) => {
      console.log("updated to " + data);
      this.recipient=data;
    } );
  }
  conversation;
  sendMessage(message){
    this.webSocketAPI._send(message);
  }

  onConversationSelected(conversation){
    this.conversation = conversation;
  }

  logout(): void {
    // Call this to log the user out of the application
    this.auth.logout({ returnTo: window.location.origin });
  }

}
