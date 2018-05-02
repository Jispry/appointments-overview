import { Component, OnInit } from '@angular/core';

import { EventsService, GroupedByEventCreator, DateTransformService } from '../services';
import { PieData, BarData } from '../charts';

@Component({
  selector: 'app-events-overview',
  templateUrl: './events-overview.component.html',
  styleUrls: ['./events-overview.component.css']
})
export class EventsOverviewComponent implements OnInit {
  public data: Array<GroupedByEventCreator>;
  public pieChartData: PieData;
  public barChartData: BarData;


  constructor(private eventService: EventsService, private dateTrasformService: DateTransformService) { }

  ngOnInit() {
    this.data = this.eventService.groupEventsByName();
    this.setChartData();
    this.setGroupedByMonthChartData();
  }

  public labelYFcn = (value) => {
    let timeObj = this.dateTrasformService.transformTimeToHoursMinutes(value);
    return `${timeObj.hours}H: ${timeObj.minutes}M`;
  }

  private setChartData(): void {
    let labels = [];
    let series = [];

    this.data.forEach((event) => {
      labels.push(event.name);
      series.push(event.totalDuration);
    });

    this.pieChartData = {
      labels: labels,
      series: series
    };
  }

  private setGroupedByMonthChartData() {
    const groupedData = this.eventService.getGroupedByMonthSeries();
    this.barChartData = {
      labels: groupedData.months,
      series: groupedData.series
    };
  }
}
