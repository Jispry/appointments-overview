import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';

import { ChartFactory, PieData } from '../chart.factory';
import { BaseChartComponent } from '../base/base-chart.component';

// TODO add legend

@Component({
  selector: 'chart-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['../base/base-chart.component.css', './pie.component.css']
})
export class PieComponent extends BaseChartComponent {
  constructor(chartFactory: ChartFactory) {
    super(chartFactory);
   }

  createChart() {
    if (this.data) {
      this.chartFactory.createPie(this.chartWrapper, this.data);
    }
  }
}
