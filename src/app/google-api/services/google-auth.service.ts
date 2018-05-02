import { Injectable, Inject, EventEmitter } from '@angular/core';
import { GOOGLEAPI_TOKEN, APICONFIG_TOKEN, GoogleApi, ClientSettings } from '../googleApi';

declare let gapi: GoogleApi;

@Injectable()
export class GoogleAuthService {
  signInStatus: EventEmitter<boolean> = new EventEmitter();

  constructor(/*@Inject(GOOGLEAPI_TOKEN) private gapi: GoogleApi, */@Inject(APICONFIG_TOKEN) private apiConfig: ClientSettings) {
    if (!gapi.client || !gapi.auth2) {
      this.loadGapi();
    }
  }

  public authorize(): void {
    if (!gapi.client || !gapi.auth2) {
      this.loadGapi();
    } else {
      gapi.auth2.getAuthInstance().signIn();
    }
  }

  public logOut(): void {
    gapi.auth2.getAuthInstance().signOut();
  }

  public get isSignedIn() {
    return gapi.auth2.getAuthInstance().isSignedIn.get();
  }

  private loadGapi() {
    console.log('loadGapi');
    gapi.load('client:auth2', () => {this.initClient(); });
  }

  /**
   *  Initializes the API client library and sets up sign-in state
   *  listeners.
   */
  private initClient() {
    gapi.client.init({
      apiKey: this.apiConfig.apiKey,
      discoveryDocs: this.apiConfig.discoveryDocs,
      clientId: this.apiConfig.clientId,
      scope: this.apiConfig.scope
    }).then(() => {
      // Listen for sign-in state changes.
      gapi.auth2.getAuthInstance().isSignedIn.listen((status) => {
        console.log(status);
        this.signInStatus.emit(status);
      });

      // Handle the initial sign-in state.
      this.signInStatus.emit(gapi.auth2.getAuthInstance().isSignedIn.get());
    });
  }
}
