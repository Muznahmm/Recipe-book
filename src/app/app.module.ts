import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { NotifierModule } from 'angular-notifier';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { AuthHeaderInterceptor } from './utils/interceptors/auth-header.interceptor';
import { HttpDelayInterceptor } from './utils/interceptors/delay.interceptor';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NotifierModule.withConfig({
      position: {
        vertical: {
          position: 'top',
          distance: 75,
        },
        horizontal: {
          position: 'right'
        }
      }
    }),
    AppRoutingModule,
  ],
  providers: [ 
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHeaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpDelayInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
