import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { RxStompService } from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';
import { WSConversation } from '../shared/model/WSConversation.model';
import { WSMessage } from '../shared/model/WSMessage.model';
import { DirectChatService } from '../shared/services/directChat.service';
import { LoginService } from '../shared/services/login.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public visible : boolean = false;
  @Output() conversationClicked: EventEmitter<any> = new EventEmitter();
  
  searchText: string;
  loadSidebarTopic: string;

  public conversations : WSConversation[];

  constructor(private rxStompService: RxStompService,public authService : AuthService,public loginService:LoginService, public directChat : DirectChatService){
    this.conversations = [];
    authService.user$.subscribe((user) => 
    {
      this.loadSidebarTopic = "/topic/loadSidebar/"+ user.email;
      this.rxStompService.publish({ destination: this.loadSidebarTopic, body: "getAllMessagesForUserTopic" });

      console.log("subscribing too" + this.loadSidebarTopic);
      this.rxStompService.watch(this.loadSidebarTopic+"/result").subscribe((message: Message) => {
        console.log("receive message");
        this.populateConversations(message.body);
 
      });
    });

    this.visible=false;
  }


  populateConversations(message: string)
  {
    console.log("populating");
    console.log(message);
    const obj = JSON.parse(message);
    var temp;

    if(obj["sender"]==this.loginService.email)
      temp = new WSConversation(obj["receiver"],obj["timestamp"],obj["content"],false); 
    else if(obj["receiver"]==this.loginService.email)
         temp = new WSConversation(obj["sender"],obj["timestamp"],obj["content"],false);

        if(this.conversations.length==0)
          this.conversations.unshift(temp);
        else
        {
            var itExists = false;
            for (let i = 0; i < this.conversations.length; i++) {
              if(this.conversations[i].name ==temp.name)
                itExists=true;
            }

            if (!itExists)
              this.conversations.unshift(temp);

        }

        console.log(this.conversations);

  }
  

  get filteredConversations() {
    return this.conversations.filter((conversation) => {
      return (
        conversation.name
          .toLowerCase()
          .includes(this.searchText.toLowerCase()) ||
        conversation.latestMessage
          .toLowerCase()
          .includes(this.searchText.toLowerCase())
      );
    });
  }



  ngOnInit(): void {
    console.log("init");
  }

  doSomething(name : string, $event) {
    this.visible = !this.visible;
    console.log("hellooo from do something:" +  this.visible);
  }
  
  startConversationWith(name : string, $event) {
    this.directChat.insertData(name);
  }

}
