import { Injectable } from '@angular/core';

export interface IHoursMinutesObj {
  hours: number;
  minutes: number;
}

@Injectable()
export class DateTransformService {
  private readonly hoursToMs = 3600000;
  private readonly minutesToMs = 60000;

  constructor() { }

  public transformTimeToHoursMinutes(time: number): IHoursMinutesObj {
    let hours = Math.floor(time / this.hoursToMs);
    let minutes = 0;
    let left = time % this.hoursToMs;
    if (left !== 0) {
      minutes = Math.floor(left / this.minutesToMs);
    }

    return {
      hours: hours,
      minutes: minutes
    };
  }
}
