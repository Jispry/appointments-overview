import { Injectable, Inject } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';

import { GOOGLEAPI_TOKEN, KALENDARID_TOKEN, GoogleApi, CalendarQuery } from '../googleApi';

declare let gapi: GoogleApi;

interface Query {
  monthFrom: number;
  monthTo: number;
}

@Injectable()
export class GoogleCalendarService {

  constructor( @Inject(KALENDARID_TOKEN) private readonly calendarId: string) { }

  public getEvents(query: Query) {
    let calendarQuery: CalendarQuery = {
      calendarId: this.calendarId,
      timeMin: this.getISODateStringFromMonth(query.monthFrom),
      timeMax: this.getISODateStringFromMonth(query.monthTo + 1),
      showDeleted: false,
    };
    return Observable.fromPromise(
      gapi.client.calendar.events.list(calendarQuery))
      .map((res) => {
        // ignore canceled recurring events
        return res.result.items.filter(x => x.status !== 'cancelled');
      });
  }


  private getISODateStringFromMonth(month: number) {
    let date = new Date(2017, month - 1, 1);
    return date.toISOString();
  }
}
