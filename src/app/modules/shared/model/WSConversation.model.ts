import { WSMessage } from "./WSMessage.model";

export class WSConversation {
    name: string;
    time: string;
    latestMessage: string;
    latestMessageRead: boolean;

    constructor(name: string,time: string,latestMessage: string,latestMessageRead: boolean ) {
        this.name = name;
        this.time = time;
        this.latestMessage = latestMessage;
        this.latestMessageRead = latestMessageRead;


      }
  }
