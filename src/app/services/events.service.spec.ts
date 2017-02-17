/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EventsService } from './events.service';
import { EventsCacheService, Event } from './events-cache.service';

describe('EventsService', () => {
  describe('Isolated', () => {
    let service: EventsService;
    let eventsCacheStub: EventsCacheService;
    let dataStub: Array<Event>;

    beforeEach(() => {
      dataStub = [];
      eventsCacheStub = <any>{
        data: dataStub,
        meta: {
          monthFrom: 1,
          momthTo: 2
        }
      };
      service = new EventsService(eventsCacheStub);
    });

    it('#groupEventsByName() shoudl return empty array if no data', () => {
      let result = service.groupEventsByName();

      expect(result.length).toEqual(0);
    });

    it('#groupEventsByName() group all events by eventName', () => {
      dataStub.push({ name: 'name', duration: 10, date: new Date(2017, 2, 5) });
      dataStub.push({ name: 'name', duration: 5, date: new Date(2017, 2, 8) });
      dataStub.push({ name: 'name', duration: 15, date: new Date(2017, 2, 12) });

      let result = service.groupEventsByName();

      expect(result.length).toEqual(1);
      expect(result[0].name).toEqual('name');
      expect(result[0].totalDuration).toEqual(30);
      expect(result[0].totalCount).toEqual(3);
    });

    it('#groupEventsByMonth() should group events by month', () => {
      eventsCacheStub.meta.monthFrom = 3;
      eventsCacheStub.meta.monthTo = 6;
      dataStub.push({ name: 'name', duration: 10, date: new Date(2017, 2, 5) });
      dataStub.push({ name: 'name', duration: 5, date: new Date(2017, 2, 8) });
      dataStub.push({ name: 'name', duration: 15, date: new Date(2017, 3, 13) });
      dataStub.push({ name: 'name', duration: 15, date: new Date(2017, 4, 12) });
      dataStub.push({ name: 'name', duration: 15, date: new Date(2017, 2, 12) });
      dataStub.push({ name: 'name', duration: 15, date: new Date(2017, 4, 18) });
      dataStub.push({ name: 'name', duration: 15, date: new Date(2017, 2, 12) });
      dataStub.push({ name: 'name', duration: 15, date: new Date(2017, 5, 1) });

      let result = service.getGroupByMonthReport();

      expect(result.length).toEqual(4);
      expect(result[0].month).toEqual(3, 'month should be 3');
      expect(result[0].nameGroup.length).toEqual(1, 'month 3 should have 2 occurances');
      expect(result[1].month).toEqual(4, 'month should be 4');
      expect(result[1].nameGroup.length).toEqual(1, 'month 4 should have 1 occurances');
      expect(result[2].month).toEqual(5, 'month should be 5');
      expect(result[2].nameGroup.length).toEqual(1, 'month 5 should have 1 occurances');
      expect(result[3].month).toEqual(6, 'month should be 6');
      expect(result[3].nameGroup.length).toEqual(1, 'month 6 should have 1 occurances');
    });

    it('#groupEventsByMonth() each group should contain all names', () => {
      eventsCacheStub.meta.monthFrom = 3;
      eventsCacheStub.meta.monthTo = 6;
      dataStub.push({ name: 'name', duration: 10, date: new Date(2017, 2, 5) });
      dataStub.push({ name: 'name2', duration: 5, date: new Date(2017, 2, 8) });
      dataStub.push({ name: 'name', duration: 15, date: new Date(2017, 3, 13) });
      dataStub.push({ name: 'name', duration: 15, date: new Date(2017, 4, 12) });


      let result = service.getGroupByMonthReport();

      expect(result.length).toEqual(3);
      expect(result[0].month).toEqual(3, 'month should be 3');
      expect(result[0].nameGroup.length).toEqual(2, 'month 3 should have 2 occurances');
      expect(result[1].month).toEqual(4, 'month should be 4');
      expect(result[1].nameGroup.length).toEqual(2, 'month 4 should have 1 occurances');
      expect(result[2].month).toEqual(5, 'month should be 5');
      expect(result[2].nameGroup.length).toEqual(2, 'month 5 should have 1 occurances');
    });
    it('#groupEventsByMonth() each group should contain all names in same order', () => {
      const expectedOrder = ['name', 'name2', 'name3'];
      eventsCacheStub.meta.monthFrom = 3;
      eventsCacheStub.meta.monthTo = 6;
      dataStub.push({ name: 'name', duration: 10, date: new Date(2017, 2, 5) });
      dataStub.push({ name: 'name2', duration: 5, date: new Date(2017, 2, 8) });
      dataStub.push({ name: 'name2', duration: 15, date: new Date(2017, 3, 13) });
      dataStub.push({ name: 'name', duration: 15, date: new Date(2017, 4, 12) });
      dataStub.push({ name: 'name3', duration: 15, date: new Date(2017, 4, 14) });


      let result = service.getGroupByMonthReport();

      expect(result.length).toEqual(3);
      expect(result[0].nameGroup.map(item => item.name)).toEqual(expectedOrder);
      expect(result[1].nameGroup.map(item => item.name)).toEqual(expectedOrder);
      expect(result[2].nameGroup.map(item => item.name)).toEqual(expectedOrder);
    });

    it('#getGroupedByMonthSeries() should return correct months', () => {
      eventsCacheStub.meta.monthFrom = 3;
      eventsCacheStub.meta.monthTo = 6;

      let result = service.getGroupedByMonthSeries();

      expect(result.months).toEqual(['march', 'april', 'may', 'june']);
    });

    it('#getGroupedByMonthSeries() should return all names', () => {
      dataStub.push({ name: 'name', duration: 10, date: new Date(2017, 2, 5) });
      dataStub.push({ name: 'name2', duration: 5, date: new Date(2017, 2, 8) });
      dataStub.push({ name: 'name2', duration: 15, date: new Date(2017, 3, 13) });

      let result = service.getGroupedByMonthSeries();

      expect(result.eventNames).toEqual(['name', 'name2']);
    });

    it('#getGroupedByMonthSeries() should ser serries', () => {
      eventsCacheStub.meta.monthFrom = 3;
      eventsCacheStub.meta.monthTo = 4;
      dataStub.push({ name: 'name', duration: 10, date: new Date(2017, 2, 5) });
      dataStub.push({ name: 'name', duration: 5, date: new Date(2017, 2, 8) });
      dataStub.push({ name: 'name', duration: 45, date: new Date(2017, 3, 13) });

      let result = service.getGroupedByMonthSeries();

      expect(result.series.length).toBe(1);
      expect(result.series[0]).toEqual([15, 45]);
    });

  });
  describe('TestBed', () => {
    beforeEach(() => {
      let eventsCacheStub = <any>{
        data: [],
      };

      TestBed.configureTestingModule({
        providers: [EventsService,
          { provide: EventsCacheService, useValue: eventsCacheStub }
        ]
      });
    });

    it('should ...', inject([EventsService], (service: EventsService) => {
      expect(service).toBeTruthy();
    }));
  });
});
