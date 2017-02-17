import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

import { ChartFactory, PieData, BarData } from '../chart.factory';

/**
 * Baseclass for all charts
 */
export abstract class BaseChartComponent implements OnInit {
    @Input()
    protected data: any;

    @ViewChild('chart')
    protected set chartEl(el: ElementRef) {
        this.chartWrapper = el.nativeElement;
    }

    protected chartWrapper: any;

    constructor(protected chartFactory: ChartFactory) { }

    ngOnInit() {
        if (this.data) {
            this.createChart();
        }
    }

    protected abstract createChart(): void;
}
