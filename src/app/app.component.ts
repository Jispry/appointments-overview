import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor() {
  }

  public ngOnInit() {
  }

  /**
   * method
   */
  public method() {
    gapi.client.setApiKey('');
  }
}