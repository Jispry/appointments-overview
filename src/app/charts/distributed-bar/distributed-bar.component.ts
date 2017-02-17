import { Component, Input } from '@angular/core';

import { ChartFactory, BarData } from '../chart.factory';
import { BaseChartComponent } from '../base/base-chart.component';

@Component({
  selector: 'chart-distributed-bar',
  templateUrl: './distributed-bar.component.html',
  styleUrls: ['../base/base-chart.component.css', './distributed-bar.component.css']
})
export class DistributedBarComponent extends BaseChartComponent {

  @Input()
  labelYFcn: Function;

  constructor(chartFactory: ChartFactory) {
    super(chartFactory);
  }

  createChart() {
    if (this.data) {
      this.chartFactory.createDistributedBar(this.chartWrapper, this.data, this.labelYFcn);
    }
  }
}
