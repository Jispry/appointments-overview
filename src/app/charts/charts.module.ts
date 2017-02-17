import { NgModule, OpaqueToken } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartFactory } from './chart.factory';
import { CHARTIST_TOKEN } from './chartist.opaqueToken';
import { PieComponent } from './pie/pie.component';
import { MultiLineBarComponent } from './multi-line-bar/multi-line-bar.component';
import { DistributedBarComponent } from './distributed-bar/distributed-bar.component';

declare let Chartist: any;

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PieComponent, MultiLineBarComponent, DistributedBarComponent],
  exports: [
    PieComponent, MultiLineBarComponent, DistributedBarComponent
  ],
  providers: [
    { provide: CHARTIST_TOKEN, useValue: Chartist },
    ChartFactory,
  ]
})
export class ChartsModule { }
