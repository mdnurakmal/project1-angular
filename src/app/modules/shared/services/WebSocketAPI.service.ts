import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

import { AuthService } from '@auth0/auth0-angular';
import { User } from '@auth0/auth0-spa-js';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';
import {  Injectable, Injector } from '@angular/core';
import { DirectChatService } from './directChat.service';

@Injectable({
    providedIn: 'root'
  })
export class WebSocketAPI {
    webSocketEndPoint: string;
    topic: string = "/topic/group";
    stompClient: any;
    currentSubscription: any;
    user: User;
    private loginservice:LoginService;

    receiver: string = "helllo";
    constructor(public auth : AuthService,public directChat : DirectChatService){
        console.log("Init websocket api");
        this.webSocketEndPoint = environment.wsEndpoint;
        this._connect();
        this.auth.user$.subscribe(val =>{
            console.log(val);
            this.user = val;
        });

        this._connect = this._connect.bind(this);
    }


    _subscribeTopic() {
        if (this.currentSubscription!==null) {
            this.currentSubscription.unsubscribe(); 
        }

        if (this.stompClient.status === 'CONNECTED') {
            const _this = this;
            this.currentSubscription = _this.stompClient.subscribe(this.user +"_"+this.directChat.recipient, function (sdkEvent) {
                _this.onMessageReceived(sdkEvent);
            });
        }
    }

    _connect() {
        console.log("Initialize WebSocket Connection");

        let ws = new SockJS(this.webSocketEndPoint);

        this.stompClient = Stomp.over(ws);
        const _this = this;
        _this.stompClient.connect({}, function (frame) {
            // _this.stompClient.subscribe(_this.topic, function (sdkEvent) {
            //     _this.onMessageReceived(sdkEvent);
            // });
            //_this.stompClient.reconnect_delay = 2000;
        }, function (error) {
            console.log("errorCallBack -> " + error)
            _this._connect();
            console.log("finished");

            //_this.stompClient.reconnect_delay = 2000;
        });

        
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
        this._connect();
        console.log("finished");
        // setTimeout(() => {
    
           
        //     console.log("Hereafter");
        // }, 5000);
    }

 /**
  * Send message to sever via web socket
  * @param {*} message 
  */
    _send(message) {
        this.stompClient.send("/app/sendMessage", {}, JSON.stringify(message));
    }

    onMessageReceived(message) {
        console.log("Message Recieved from Server :: " + message);
        //this.appComponent.handleMessage(JSON.stringify(message.body));
    }
}