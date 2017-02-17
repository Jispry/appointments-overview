/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EventsCacheService } from './events-cache.service';

describe('EventsCacheService', () => {
  describe('Isolated', () => {
    let service: EventsCacheService;

    beforeEach(() => {
      service = new EventsCacheService();
    });

    it('#initialize should set metaData', () => {
      let testData = [
        {
          summary: 'summary1',
          end: {
            dateTime: ''
          },
          start: {
            dateTime: ''
          }
        },
      ];

      service.init(<any>testData, 1, 3);

      expect(service.meta).toBeTruthy();
      expect(service.meta.monthFrom).toBe(1);
      expect(service.meta.monthTo).toBe(3);
      expect(service.meta.queried).toBeTruthy();
    });

    it('#initialize should load data', () => {
      let testData = [
        {
          summary: 'summary1',
          end: {
            dateTime: '2016-08-31T18:00:00+02:00'
          },
          start: {
            dateTime: '2016-08-31T10:00:00+02:00'
          }
        },
        {
          summary: 'summary2',
          end: {
            date: '2016-08-30'
          },
          start: {
            date: '2016-08-31'
          }
        }
      ];

      service.init(<any>testData, 0, 0);

      expect(service.data.length).toBe(2);
      expect(service.data.map(x => x.name)).toEqual(['summary1', 'summary2']);
    });

    it('#initialize should set Dates correctly', () => {
      const dateTimeStart = '2016-08-31T10:00:00+02:00';
      const dateTimeEnd = '2016-08-31T18:00:00+02:00';

      const dateStart = '2016-08-31';
      const dateEnd = '2016-08-30';

      let testData = [
        {
          summary: 'summary1',
          end: {
            dateTime: dateTimeEnd
          },
          start: {
            dateTime: dateTimeStart
          }
        },
        {
          summary: 'summary2',
          end: {
            date: '2016-08-30'
          },
          start: {
            date: '2016-08-31'
          }
        }
      ];

      service.init(<any>testData, 0, 0);

      expect(service.data.length).toBe(2);

      // assert hours
      expect(service.data[0].date).toEqual(new Date(dateTimeStart));
      expect(service.data[0].duration).toEqual((new Date(dateTimeEnd)).getTime() - (new Date(dateTimeStart)).getTime());

      // assert dates
      expect(service.data[1].date).toEqual(new Date(dateStart));
      expect(service.data[1].duration).toEqual((new Date(dateEnd)).getTime() - (new Date(dateStart)).getTime());
    });
  });

  describe('TestBed', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [EventsCacheService]
      });
    });

    it('should ...', inject([EventsCacheService], (service: EventsCacheService) => {
      expect(service).toBeTruthy();
    }));
  });
});
