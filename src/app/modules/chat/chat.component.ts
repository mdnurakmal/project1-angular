import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DirectChatService } from '../shared/services/directChat.service';
import { LoginService } from '../shared/services/login.service';

import { WebSocketAPI } from '../shared/services/WebSocketAPI.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  @Input() conversation;
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();
  emojiPickerVisible;
  message = '';
  receiver ='';
  constructor(public webSocketAPI : WebSocketAPI,public directChatService : DirectChatService,public loginService : LoginService){
    this.directChatService.getVar().subscribe((data) => {
      this.receiver=data;
    } );
  }

  ngOnInit(): void {}

  submitMessage(event) {
    let value = event.target.value.trim();
    this.message = '';
    if (value.length < 1) return false;

    var message = 
    {
        "sender": this.loginService.email,
        "receiver": this.receiver,
        "content":value
    };



    this.webSocketAPI._send(message);



    // this.conversation.latestMessage = value;
    // this.conversation.messages.unshift({
    //   id: 1,
    //   body: value,
    //   time: '10:21',
    //   me: true,
    // });
  }

  emojiClicked(event) {
    this.message += event.emoji.native;
  }
}
