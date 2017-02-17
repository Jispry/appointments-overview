import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GOOGLEAPI_TOKEN, APICONFIG_TOKEN, KALENDARID_TOKEN } from './googleApi';
import { GoogleAuthService } from './services/google-auth.service';
import { GoogleCalendarService } from './services/google-calendar.service';
import { SignInComponent } from './sign-in/sign-in.component';
import { apiKeys, kalendarId } from './api-config'; // this file is not tracked by GIT

export declare let gapi: any;

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [SignInComponent],
  exports: [SignInComponent],
  providers: [
    // { provide: GOOGLEAPI_TOKEN, useValue: gapi },
    { provide: APICONFIG_TOKEN, useValue: apiKeys },
    { provide: KALENDARID_TOKEN, useValue: kalendarId },
    GoogleAuthService,
    GoogleCalendarService
  ],
})
export class GoogleApiModule { }
