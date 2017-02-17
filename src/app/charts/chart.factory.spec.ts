import { ChartFactory, PieData, BarData, DistributedBarData } from './chart.factory';

describe('ChartFactory', () => {
    let factory: ChartFactory;
    let chartistMock: any;

    beforeEach(() => {
        chartistMock = jasmine.createSpyObj('chartist', ['Pie', 'Bar']);
        factory = new ChartFactory(chartistMock);
    });

    it('#createPie should call Chartists.Pie', () => {
        const expectedData: PieData = {
            labels: ['one', 'two'],
            series: [10, 20]
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

        factory.createPie(null, expectedData);

        expect(chartistMock.Pie).toHaveBeenCalledWith(null, expectedData, jasmine.any(Object), jasmine.any(Object));
    });

    it('#createBar should call Chartist.Bar', () => {
        const expectedData: BarData = {
            labels: ['one', 'two'],
            series: [
                [10, 20]
            ]
        };

        factory.createBar(null, expectedData);

        expect(chartistMock.Bar).toHaveBeenCalledWith(null, expectedData, jasmine.any(Object));
    });

    it('#createDistributedBar should call Chartist.Bar', () => {
        const expectedData: DistributedBarData = {
            labels: ['one', 'two'],
            series: [10, 20]
        };

        factory.createDistributedBar(null, expectedData);

        expect(chartistMock.Bar).toHaveBeenCalledWith(null, expectedData, jasmine.any(Object));
    });
});
