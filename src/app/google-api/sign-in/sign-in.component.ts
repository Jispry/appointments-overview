import { Component, OnInit, NgZone } from '@angular/core';

import { GoogleAuthService } from '../services/google-auth.service';

@Component({
  selector: 'google-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  public isSignedIn: boolean;

  constructor(private authService: GoogleAuthService, private zone: NgZone) { }

  ngOnInit() {
    this.authService.signInStatus.subscribe(status => {
      // for some yet unknow template is not refreshed by default
      // workaround
      this.zone.run(() => {
        this.isSignedIn = status;
      });
    });
  }
  public logIn() {
    this.authService.authorize();
  }

  public logOut() {
    this.authService.logOut();
  }
}
