import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DataService } from '../shared/services/data.service';
import { WebSocketAPI } from '../shared/services/WebSocketAPI.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {


  constructor(public auth : AuthService,){
    console.log("inside login component ")
  
    this.webSocketAPI = new WebSocketAPI();
    this.webSocketAPI._connect();
  }
  conversation;
  webSocketAPI: WebSocketAPI;
  
  onConversationSelected(conversation){
    this.conversation = conversation;
  }

  logout(): void {
    // Call this to log the user out of the application
    this.auth.logout({ returnTo: window.location.origin });
  }

}
