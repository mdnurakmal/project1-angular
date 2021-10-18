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
import { NewchatComponent } from '../newchat/newchat.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('slideMenu', [
      state('false', style({
        transform: 'translateX(-250px)'
      })),
      state('true', style({
        transform: 'translateX(0)'
      })),
      transition('true <=> false', animate('400ms ease-in-out'))
    ],
    )
  ]
})
export class SidebarComponent implements OnInit {
  public visible : boolean = false;
  @Output() conversationClicked: EventEmitter<any> = new EventEmitter();
  
  @ViewChild(NewchatComponent)
  private newchatComponent: NewchatComponent;

  searchText: string;
  conversations = [
    {
      name: 'David',
      time: '8:21',
      latestMessage: 'Hi there!!',
      latestMessageRead: false,
      messages: [
        { id: 1, body: 'Hello world', time: '8:21', me: true },
        { id: 2, body: 'How are you?', time: '8:21', me: false },
        { id: 3, body: 'I am fine thanks', time: '8:21', me: true },
        { id: 4, body: 'Glad to hear that', time: '8:21', me: false },
      ],
    },
    {
      name: 'James',
      time: '8:21',
      latestMessage: 'wow',
      latestMessageRead: true,
      messages: [
        { id: 1, body: 'Hello world', time: '8:21', me: true },
        { id: 2, body: 'How are you?', time: '8:21', me: false },
        { id: 3, body: 'I am fine thanks', time: '8:21', me: true },
        { id: 4, body: 'Glad to hear that', time: '8:21', me: false },
      ],
    },
    {
      name: 'Andrew',
      time: '8:21',
      latestMessage: 'I am fine',
      latestMessageRead: false,
      messages: [
        { id: 1, body: 'Hello world', time: '8:21', me: true },
        { id: 2, body: 'How are you?', time: '8:21', me: false },
        { id: 3, body: 'I am fine thanks', time: '8:21', me: true },
        { id: 4, body: 'Glad to hear that', time: '8:21', me: false },
      ],
    },
    {
      name: 'Richard',
      time: '8:21',
      latestMessage: 'lol',
      latestMessageRead: true,
      messages: [
        { id: 1, body: 'Hello world', time: '8:21', me: true },
        { id: 2, body: 'How are you?', time: '8:21', me: false },
        { id: 3, body: 'I am fine thanks', time: '8:21', me: true },
        { id: 4, body: 'Glad to hear that', time: '8:21', me: false },
      ],
    },
    {
      name: 'Dyno',
      time: '8:21',
      latestMessage: 'Alright',
      latestMessageRead: false,
      messages: [
        { id: 1, body: 'Hello world', time: '8:21', me: true },
        { id: 2, body: 'How are you?', time: '8:21', me: false },
        { id: 3, body: 'I am fine thanks', time: '8:21', me: true },
        { id: 4, body: 'Glad to hear that', time: '8:21', me: false },
      ],
    },
    {
      name: 'Julie',
      time: '8:21',
      latestMessage: "Let's go",
      latestMessageRead: false,
      messages: [
        { id: 1, body: 'Hello world', time: '8:21', me: true },
        { id: 2, body: 'How are you?', time: '8:21', me: false },
        { id: 3, body: 'I am fine thanks', time: '8:21', me: true },
        { id: 4, body: 'Glad to hear that', time: '8:21', me: false },
      ],
    },
    {
      name: 'Tom',
      time: '8:21',
      latestMessage: 'I see',
      latestMessageRead: true,
      messages: [
        { id: 1, body: 'Hello world', time: '8:21', me: true },
        { id: 2, body: 'How are you?', time: '8:21', me: false },
        { id: 3, body: 'I am fine thanks', time: '8:21', me: true },
        { id: 4, body: 'Glad to hear that', time: '8:21', me: false },
      ],
    },
    {
      name: 'Jerry',
      time: '8:21',
      latestMessage: 'OMG',
      latestMessageRead: false,
      messages: [
        { id: 1, body: 'Hello world', time: '8:21', me: true },
        { id: 2, body: 'How are you?', time: '8:21', me: false },
        { id: 3, body: 'I am fine thanks', time: '8:21', me: true },
        { id: 4, body: 'Glad to hear that', time: '8:21', me: false },
      ],
    },
    {
      name: 'Grey',
      time: '8:21',
      latestMessage: 'Oh No',
      latestMessageRead: false,
      messages: [
        { id: 1, body: 'Hello world', time: '8:21', me: true },
        { id: 2, body: 'How are you?', time: '8:21', me: false },
        { id: 3, body: 'I am fine thanks', time: '8:21', me: true },
        { id: 4, body: 'Glad to hear that', time: '8:21', me: false },
      ],
    },
    {
      name: 'Jill',
      time: '8:21',
      latestMessage: 'Thanks',
      latestMessageRead: true,
      messages: [
        { id: 1, body: 'Hello world', time: '8:21', me: true },
        { id: 2, body: 'How are you?', time: '8:21', me: false },
        { id: 3, body: 'I am fine thanks', time: '8:21', me: true },
        { id: 4, body: 'Glad to hear that', time: '8:21', me: false },
      ],
    },
    {
      name: 'Blue',
      time: '8:21',
      latestMessage: 'Take care',
      latestMessageRead: false,
      messages: [
        { id: 1, body: 'Hello world', time: '8:21', me: true },
        { id: 2, body: 'How are you?', time: '8:21', me: false },
        { id: 3, body: 'I am fine thanks', time: '8:21', me: true },
        { id: 4, body: 'Glad to hear that', time: '8:21', me: false },
      ],
    },
    {
      name: 'King',
      time: '8:21',
      latestMessage: 'I am coming now',
      latestMessageRead: false,
      messages: [
        { id: 1, body: 'Hello world', time: '8:21', me: true },
        { id: 2, body: 'How are you?', time: '8:21', me: false },
        { id: 3, body: 'I am fine thanks', time: '8:21', me: true },
        { id: 4, body: 'Glad to hear that', time: '8:21', me: false },
      ],
    },
    {
      name: 'Kong',
      time: '8:21',
      latestMessage: 'Good Morning!',
      latestMessageRead: true,
      messages: [
        { id: 1, body: 'Hello world', time: '8:21', me: true },
        { id: 2, body: 'How are you?', time: '8:21', me: false },
        { id: 3, body: 'I am fine thanks', time: '8:21', me: true },
        { id: 4, body: 'Glad to hear that', time: '8:21', me: false },
      ],
    },
    {
      name: 'Rock',
      time: '8:21',
      latestMessage: 'Good Morning!',
      latestMessageRead: true,
      messages: [
        { id: 1, body: 'Hello world', time: '8:21', me: true },
        { id: 2, body: 'How are you?', time: '8:21', me: false },
        { id: 3, body: 'I am fine thanks', time: '8:21', me: true },
        { id: 4, body: 'Glad to hear that', time: '8:21', me: false },
      ],
    },
  ];

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

  constructor(public auth : AuthService){
    this.visible=false;
  }

  ngOnInit(): void {
    console.log("init");
  }

  doSomething(name : string, $event) {
    this.visible = !this.visible;
    console.log("hellooo from do something:" +  this.visible);
  }


}
