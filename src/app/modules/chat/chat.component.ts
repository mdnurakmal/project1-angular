import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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
  constructor(public webSocketAPI : WebSocketAPI){

  }

  ngOnInit(): void {}

  submitMessage(event) {
    let value = event.target.value.trim();
    this.message = '';
    if (value.length < 1) return false;
    this.webSocketAPI._send(value);
    this.conversation.latestMessage = value;
    this.conversation.messages.unshift({
      id: 1,
      body: value,
      time: '10:21',
      me: true,
    });
  }

  emojiClicked(event) {
    this.message += event.emoji.native;
  }
}
