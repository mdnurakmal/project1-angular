import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DirectChatService {

  recipient = new BehaviorSubject(""); //Varible that need update
  constructor() { }

  public getVar() {
    return this.recipient.asObservable();
  }
  public insertData(data) {
    this.recipient.next(data);
  }
}

