import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { WebSocketAPI } from '../shared/services/WebSocketAPI.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {


  constructor(public auth : AuthService,public webSocketAPI : WebSocketAPI){
    console.log("inside login component ")
  
    this.webSocketAPI._connect();
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