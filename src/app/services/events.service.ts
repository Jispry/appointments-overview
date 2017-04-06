import { Injectable } from '@angular/core';

import { EventsCacheService, Event, CacheMeta } from './events-cache.service';

export interface GroupedByEventCreator {
  name: string;
  totalDuration: number;
  totalCount: number;
}

export interface GroupedByMonth {
  month: number;
  nameGroup: Array<GroupedByEventCreator>;
}

export interface GroupedByMonthSeries {
  months: Array<string>;
  series: Array<Array<number>>;
  eventNames: Array<string>;
}

@Injectable()
export class EventsService {
  private readonly data: Array<Event>;
  private readonly meta: CacheMeta;

  constructor(cacheService: EventsCacheService) {
    this.data = cacheService.data;
    this.meta = cacheService.meta;
  }

  public groupEventsByName(): Array<GroupedByEventCreator> {
    return this.groupByCreator(this.data);
  }

  public getGroupByMonthReport(): Array<GroupedByMonth> {
    const result: Array<GroupedByMonth> = [];

    const allNames = this.getAllEventNames();
    const groupedByMonth = this.groupEventsByMonth(this.data);
    for (let i = 0; i < groupedByMonth.length; i++) {
      const group = groupedByMonth[i];

      const groupedByName = this.groupByCreator(group);
      const orderer = this.ordeByList(groupedByName, allNames);

      result.push({
        month: this.meta.monthFrom + i,
        nameGroup: orderer
      });
    }

    return result;
  }

  public getGroupedByMonthSeries(): GroupedByMonthSeries {
    let eventsOrder = this.getAllEventNames();
    let result: GroupedByMonthSeries = {
      months: this.getMonthsFromMeta(),
      eventNames: eventsOrder,
      series: []
    };

    for (let i = 0; i < eventsOrder.length; i++) {
      const eventName = eventsOrder[i];
      // events with name == eventName
      let namedEvents = this.data.filter(item => item.name === eventName);
      const serie = this.initializeEmptyArray<number>(this.meta.monthTo - this.meta.monthFrom + 1, 0);
      for (let j = 0; j < namedEvents.length; j++) {
        let event = namedEvents[j];
        let serieIndex = event.date.getMonth() + 1 - this.meta.monthFrom;
        serie[serieIndex] += event.duration;
      }
      result.series.push(serie);
    }

    return result;
  }

  private initializeEmptyArray<T>(length: number, defaultValue: T): Array<T> {
    const array: Array<T> = [];

    for (let i = 0; i < length; i++) {
      array[i] = defaultValue;
    }
    return array;
  }

  private getMonthsFromMeta(): Array<string> {
    let result = [];
    for (let i = this.meta.monthFrom; i <= this.meta.monthTo; i++) {
      result.push(this.getMonthName(i));
    }

    return result;
  }

  private getMonthName(i: number, jsDate?: boolean) {
    let months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

    if (!jsDate) {
      i--;
    }

    return months[i];
  }

  private groupEventsByMonth(events: Array<Event>): Array<Array<Event>> {
    let result: Array<Array<Event>> = [];
    // group Month index
    for (let i = 0; i < events.length; i++) {
      const event = events[i];
      // momth index in gropedByMonth array is 0 - 11
      const monthIndex = event.date.getMonth() + 1 - this.meta.monthFrom;
      // initialize array if needed
      if (!result[monthIndex]) {
        result[monthIndex] = [];
      }
      result[monthIndex].push(event);
    }

    return result;
  }

  private groupByCreator(events: Array<Event>): Array<GroupedByEventCreator> {
    const result: Array<GroupedByEventCreator> = [];

    if (!events) {
      return result;
    }
    // group By name
    for (let i = 0; i < events.length; i++) {
      const event = events[i];

      let index = result.findIndex(x => x.name === event.creator);
      // if found
      if (index > -1) {
        const found = result[index];
        found.totalCount++;
        found.totalDuration += event.duration;
      } else {
        let newEvent: GroupedByEventCreator = {
          name: event.creator,
          totalDuration: event.duration,
          totalCount: 1
        };

        result.push(newEvent);
      }
    }

    return result;
  }

  private ordeByList(events: Array<GroupedByEventCreator>, orderBy: Array<string>): Array<GroupedByEventCreator> {
    let result = [];
    for (let i = 0; i < orderBy.length; i++) {
      let name = orderBy[i];
      let found = events.find((val) => { return val.name === name; });

      if (found) {
        result.push(found);
      } else {
        let emptyEvent: GroupedByEventCreator = {
          name: name,
          totalCount: 0,
          totalDuration: 0
        };
        result.push(emptyEvent);
      }
    }

    return result;
  }

  private getAllEventNames(): Array<string> {
    let result = [];
    for (let i = 0; i < this.data.length; i++) {
      const event = this.data[i];
      if (result.indexOf(event.name) === -1) {
        result.push(event.name);
      }
    }
    return result;
  }
}
