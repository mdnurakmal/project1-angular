import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CommonModule } from '@angular/common';

import { AuthModule } from '@auth0/auth0-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppService } from './app.service';
import { HttpClientModule } from '@angular/common/http';

export function init_app(appService: AppService) {
  return () => appService.load();
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    AppRoutingModule,
     // Import the module into the application, with configuration
     AuthModule.forRoot({
      domain: 'dev-4srngy77.us.auth0.com',
      clientId: '8m0HtJPNOK5TLdjyZFrAtMpP0F6RaeD0',
    }),
  ],
  providers: [
    { 
      provide: APP_INITIALIZER, 
      useFactory: init_app, 
      deps: [ AppService ], 
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
