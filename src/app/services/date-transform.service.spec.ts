/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DateTransformService, IHoursMinutesObj } from './date-transform.service';

describe('DateTransformServiceService', () => {
  describe('Isolated', () => {
    let service: DateTransformService;

    beforeEach(() => {
      service = new DateTransformService;
    });

    describe('transformTimeToTimeObj', () => {
      it('shoud transform number 3600000 to 1 Hour 0 minutes obj', () => {
        let expectedTimeObj: IHoursMinutesObj = {
          hours: 1,
          minutes: 0
        };

        let result = service.transformTimeToHoursMinutes(3600000);

        expect(result).toEqual(expectedTimeObj);
      });

      it('shoud transform number 3660000 to 1 Hour 1 minutes obj', () => {
        let expectedTimeObj: IHoursMinutesObj = {
          hours: 1,
          minutes: 1
        };

        let result = service.transformTimeToHoursMinutes(3660000);

        expect(result).toEqual(expectedTimeObj);
      });
    });
  });
  describe('TestBed', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [DateTransformService]
      });
    });

    it('should ...', inject([DateTransformService], (service: DateTransformService) => {
      expect(service).toBeTruthy();
    }));
  });
});
