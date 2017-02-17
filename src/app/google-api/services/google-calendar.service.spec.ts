/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GoogleCalendarService } from './google-calendar.service';
import { KALENDARID_TOKEN } from '../googleApi';

describe('GoogleCalendarService', () => {
  let kalendarId;
    beforeEach(() => {
      kalendarId = '';
      TestBed.configureTestingModule({
        providers: [
          GoogleCalendarService,
          { provide: KALENDARID_TOKEN, useValue: kalendarId }
        ]
      });
    });

  it('should ...', inject([GoogleCalendarService], (service: GoogleCalendarService) => {
    expect(service).toBeTruthy();
  }));
});
