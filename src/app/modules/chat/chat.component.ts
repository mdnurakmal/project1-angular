import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RxStompService } from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';
import { WSMessage } from '../shared/model/WSMessage.model';
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
  public receivedMessages: WSMessage[] = [];

  message = '';
  receiver ='';
  chatRoomTopic: string = '';
  loadMessagesTopic: string = '';
  loadMessagesSub;
  receiverSubscription;


  constructor(private rxStompService: RxStompService,public directChatService : DirectChatService,public loginService : LoginService){

    this.directChatService.getVar().subscribe((data) => {
      console.log(data);
      this.receiver=data;
    if(data) 
    {
      this.receivedMessages=[];
      this.loadMessagesTopic = "/topic/loadMessages/"+ this.loginService.email + "/" + data;

      
      this.loadMessagesSub = this.rxStompService.watch(this.loadMessagesTopic+"/result").subscribe((message: Message) => {
        
        var hashCodeTopic = message.body;
        this.chatRoomTopic = "/topic/messages/" + hashCodeTopic;

        if(this.receiverSubscription)
          this.receiverSubscription.unsubscribe();

        if(this.loadMessagesSub)
          this.loadMessagesSub.unsubscribe();

        console.log("subscribing to " + this.chatRoomTopic);
        this.receiverSubscription = this.rxStompService.watch(this.chatRoomTopic).subscribe((message: Message) => {
          console.log("Received message:" + message.body);
          this.convertToMessage(message.body,false);
          console.log("Total rececived messages:" + this.receivedMessages.length);
          
        });
        
        this.rxStompService.publish({ destination: this.loadMessagesTopic, body: "subscribedToTopic" });
 
        });


      this.rxStompService.publish({ destination: this.loadMessagesTopic, body: "getAllMessagesTopic" });
 
    }
    } );
  }

  convertToMessage(msg : string, origin: boolean) : void {
    const obj = JSON.parse(msg);
    obj.origin=origin;
    this.receivedMessages.unshift(obj);
  }

  ngOnInit(): void {}



  submitMessage(event) {
    let value = event.target.value.trim();
    this.message = '';
    if (value.length < 1) return false;

    const current = new Date();
    const timestamp = current.toLocaleString('en-US', { hour: 'numeric',minute: 'numeric', hour12: true })

    var content = 
    {
        "sender": this.loginService.email,
        "receiver": this.receiver,
        "content":value,
        "timestamp": timestamp
    };

    const message = JSON.stringify(content);
    //this.convertToMessage(message,true);
    this.rxStompService.publish({ destination: this.chatRoomTopic, body: message });


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
