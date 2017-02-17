/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { TimeSpanPipe } from './time-span.pipe';

describe('TimeSpanPipe', () => {
  let transformMock: any;
  let pipe: TimeSpanPipe;

  beforeEach(() => {
    transformMock = jasmine.createSpyObj('DateTransformService', ['transformTimeToHoursMinutes']);
    pipe = new TimeSpanPipe(transformMock);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('shoud format string according to transformTimeToHoursMinutes result', () => {
    (<jasmine.Spy>transformMock.transformTimeToHoursMinutes).and.returnValue({hours: 1, minutes: 2});

    let result = pipe.transform(3600000);

    expect(result).toEqual('Hours:1 Minutes:2');
  });
});
