import { Injectable } from '@angular/core';
import { CalendarEvent, DateObject } from '../google-api';

interface EventCache {
  meta: CacheMeta;
  data: Array<Event>;
}

export interface Event {
  name: string;
  duration: number;
  date: Date;
}

export interface CacheMeta {
  queried: Date;
  monthFrom: number;
  monthTo: number;
}
/**
 * in-memory database of Calendar events
 */
@Injectable()
export class EventsCacheService {
  private cache: EventCache;

  public get data(): Array<Event> {
    return this.cache.data;
  }

  public get meta() {
    return this.cache.meta;
  }

  constructor() { }

  public init(data: Array<CalendarEvent>, mothFrom: number, monthTo: number): void {
    this.cache = {
      meta: {
        queried: new Date(),
        monthFrom: mothFrom,
        monthTo: monthTo
      },
      data: data.map((event) => {
        let dateFrom = this.getDateFromDateObject(event.start);
        let dateTo = this.getDateFromDateObject(event.end);
        return {
          name: event.summary,
          duration: dateTo.getTime() - dateFrom.getTime(),
          date: dateFrom
        };
      })
    };
  }

  private getDateFromDateObject(obj: DateObject): Date {
    if (obj.dateTime) {
      return new Date(obj.dateTime);
    } else {
      return new Date(obj.date);
    }
  }
}
