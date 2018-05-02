import { Injectable, Inject } from '@angular/core';
import { CHARTIST_TOKEN } from './chartist.injectionToken';

export interface PieData {
    labels: Array<string>;
    series: Array<number>;
}

export interface DistributedBarData {
    labels: Array<string>;
    series: Array<number>;
}

export interface BarData {
    labels: Array<string>;
    series: Array<Array<number>>;
}

@Injectable()
export class ChartFactory {
    constructor( @Inject(CHARTIST_TOKEN) private chartist: any) {
    }

    public createPie(wrapperEl: HTMLElement, data: PieData) {
        let options = {
            labelInterpolationFnc: this.labelInterpolationFunction
        };

        let responsiveOptions = [
            ['screen and (min-width: 640px)', {
                chartPadding: 30,
                labelOffset: 100,
                labelDirection: 'explode',
                labelInterpolationFnc: function (value) {
                    return value;
                }
            }],
            ['screen and (min-width: 1024px)', {
                labelOffset: 80,
                chartPadding: 20
            }]
        ];

        new this.chartist.Pie(wrapperEl, data, options, responsiveOptions);
    }

    public createBar(wrapperEl: HTMLElement, data: BarData, labelFncY?: Function) {
        let options = {
            labelInterpolationFnc: this.labelInterpolationFunction,
            axisY: {
                offset: 80,
                labelInterpolationFnc: labelFncY || this.labelInterpolationFunction
            }
        };
        new this.chartist.Bar(wrapperEl, data, options);
    }

    public createDistributedBar(wrapperEl: HTMLElement, data: DistributedBarData, labelFncY?: Function) {
        let options = {
            axisY: {
                offset: 80,
                labelInterpolationFnc: labelFncY || this.labelInterpolationFunction
            },
            distributeSeries: true
        };

        new this.chartist.Bar(wrapperEl, data, options);
    }

    private labelInterpolationFunction(value) {
        return value;
    }
}
