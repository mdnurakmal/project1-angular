import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RxStompService } from '@stomp/ng2-stompjs';
import { DirectChatService } from '../shared/services/directChat.service';
import { LoginService } from '../shared/services/login.service';

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
  constructor(private rxStompService: RxStompService,public directChatService : DirectChatService,public loginService : LoginService){
    this.directChatService.getVar().subscribe((data) => {
      this.receiver=data;
    } );
  }

  ngOnInit(): void {}



  submitMessage(event) {
    let value = event.target.value.trim();
    this.message = '';
    if (value.length < 1) return false;

    var content = 
    {
        "sender": this.loginService.email,
        "receiver": this.receiver,
        "content":value
    };

    const message = JSON.stringify(content);
    this.rxStompService.publish({ destination: '/app/sendMessage', body: message });

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
