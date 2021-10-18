import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { User } from '@auth0/auth0-spa-js';

@Injectable({
    providedIn: 'root'
  })
export class WebSocketAPI {
    webSocketEndPoint: string = 'http://localhost:8080/ws-chat';
    topic: string = "/topic/group";
    stompClient: any;
    user: User;
    receiver: string = "helllo";
    constructor(public auth : AuthService){
        this.auth.user$.subscribe(val =>{
            console.log(val);
            this.user = val;
        });
    }

    _connect() {
        console.log("Initialize WebSocket Connection");
        let ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(ws);
        const _this = this;
        _this.stompClient.connect({}, function (frame) {
            _this.stompClient.subscribe(_this.topic, function (sdkEvent) {
                _this.onMessageReceived(sdkEvent);
            });
            //_this.stompClient.reconnect_delay = 2000;
        }, this.errorCallBack);
    };

    _disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
        console.log("Disconnected");
    }

    // on error, schedule a reconnection attempt
    errorCallBack(error) {
        console.log("errorCallBack -> " + error)
        setTimeout(() => {
            this._connect();
        }, 5000);
    }

    

      

 /**
  * Send message to sever via web socket
  * @param {*} message 
  */
    _send(message) {


        var courseList =
        {
          sender: this.user.name,
          receiver: this.receiver,
          content: message
        };

        this.stompClient.send("/app/sendMessage", {}, JSON.stringify(courseList));
    }

    onMessageReceived(message) {
        console.log("Message Recieved from Server :: " + message);
        //this.appComponent.handleMessage(JSON.stringify(message.body));
    }
}