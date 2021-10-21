import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Route, Router } from '@angular/router';
import { WebSocketAPI } from './WebSocketAPI.service';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public authorized$: Observable<boolean>;
  private authorizedSource: BehaviorSubject<boolean>;

  public static _instance : LoginService;

  public email : string;
  constructor(private router: Router,public auth : AuthService) {
    LoginService._instance=this;

    this.authorizedSource = new BehaviorSubject<boolean>(false);
    this.authorized$ = this.authorizedSource.asObservable();

    WebSocketAPI._instanceWebSocketAPI._connect();
  }

  public isAuthorized(): boolean {
    return this.authorizedSource.value;
  }

  public setAuthorized(value: boolean): void {
    const previous = this.authorizedSource.value;
    this.authorizedSource.next(value);
    if (previous === this.authorizedSource.value) {
      return;
    }

    this.printpath('', this.router.config);

  }

  public reconnect()
  {
    WebSocketAPI._instanceWebSocketAPI = new WebSocketAPI(this.auth);
    WebSocketAPI._instanceWebSocketAPI._connect();
  }

  public printpath(parent: String, config: Route[]) {
    for (let i = 0; i < config.length; i++) {
      const route = config[i];
      console.log(parent + '/' + route.path);
      if (route.children) {
        const currentPath = route.path ? parent + '/' + route.path : parent;
        this.printpath(currentPath, route.children);
      }
    }
  }
}

