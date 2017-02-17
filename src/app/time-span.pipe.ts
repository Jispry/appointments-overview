import { Pipe, PipeTransform } from '@angular/core';

import { DateTransformService } from './services';

@Pipe({
  name: 'timeSpan'
})
export class TimeSpanPipe implements PipeTransform {
  constructor(private transformService: DateTransformService) {
  }

  transform(value: number, args?: any): string {
    let result = this.transformService.transformTimeToHoursMinutes(value);

    return `Hours:${result.hours} Minutes:${result.minutes}`;
  }

}
