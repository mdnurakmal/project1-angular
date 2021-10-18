import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public authorized$: Observable<boolean>;
  private authorizedSource: BehaviorSubject<boolean>;

  public email : string;
  constructor(private router: Router) {
    this.authorizedSource = new BehaviorSubject<boolean>(false);
    this.authorized$ = this.authorizedSource.asObservable();
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

