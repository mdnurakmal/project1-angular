

import { Component, OnInit  } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { LoginService } from './modules/shared/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'app';

  public isTheManager: boolean;
  constructor(private authService: AuthService,private loginService: LoginService) {
    authService.idTokenClaims$.subscribe((claims) => 
    
    {
      console.log(claims + " authorized ");
      this.loginService.setAuthorized(true);

    });

    authService.user$.subscribe((user) => 
    {
      this.loginService.email=user.email;
    });

   

    authService.error$.subscribe((error) => console.log(error));
  }

  public ngOnInit(): void {

    this.isTheManager = this.loginService.isAuthorized();
  }

}