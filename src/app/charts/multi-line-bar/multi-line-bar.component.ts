import { Component, Input } from '@angular/core';

import { ChartFactory, BarData } from '../chart.factory';
import { BaseChartComponent } from '../base/base-chart.component';

@Component({
  selector: 'chart-multi-line-bar',
  templateUrl: './multi-line-bar.component.html',
  styleUrls: ['../base/base-chart.component.css', './multi-line-bar.component.css']
})
export class MultiLineBarComponent extends BaseChartComponent {
  @Input()
  labelYFcn: Function;

  constructor(chartFactory: ChartFactory) {
    super(chartFactory);
  }

  createChart() {
    if (this.data) {
      this.chartFactory.createBar(this.chartWrapper, this.data, this.labelYFcn);
    }
  }
}
