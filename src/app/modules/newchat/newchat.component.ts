import { Component,EventEmitter,HostBinding, HostListener, Input, OnInit, Output } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { DirectChatService } from '../shared/services/directChat.service';

@Component({
  selector: 'app-newchat',
  templateUrl: './newchat.component.html',
  styleUrls: ['./newchat.component.scss']
})
export class NewchatComponent implements OnInit {
  @Input() visible : boolean;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() recipientChange = new EventEmitter<string>();
  searchText: string;
  recipient: string;
  constructor( public directChatService : DirectChatService) { 
    this.directChatService.getVar().subscribe((data) => {
      console.log(data);
    } );

  }

  ngOnInit(): void {
  }

  closeNewChat() {
    this.visible = !this.visible;
    this.visibleChange.emit(this.visible);
  }

  newChat(){
   this.directChatService.insertData(this.searchText);
   this.closeNewChat();
  }

  newGroup(){
    console.log("new group");
    this.closeNewChat();
   }

}
