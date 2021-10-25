import { Component,EventEmitter,HostBinding, HostListener, Input, OnInit, Output } from '@angular/core';
import { RxStompService } from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';

import { DirectChatService } from '../shared/services/directChat.service';
import { LoginService } from '../shared/services/login.service';

@Component({
  selector: 'app-newchat',
  templateUrl: './newchat.component.html',
  styleUrls: ['./newchat.component.scss']
})
export class NewchatComponent implements OnInit {

  @Input() visible : boolean;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() recipientChange = new EventEmitter<string>();

  recipient: string;

  constructor(private rxStompService: RxStompService,public directChatService : DirectChatService,public loginService : LoginService) { 

  }


  closeNewChat() {
    this.visible = !this.visible;
    this.visibleChange.emit(this.visible);
  }

  newChat(){
   this.directChatService.insertData(this.recipient);


   this.closeNewChat();
  }

  newGroup(){
    console.log("new group");
    this.closeNewChat();
   }


     
   ngOnInit() {
    console.log("initialize websocket api");

}

}
