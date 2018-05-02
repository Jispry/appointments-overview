import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Component, Input, Pipe, PipeTransform } from '@angular/core';

import { PieData, BarData } from '../charts';
import { EventsOverviewComponent } from './events-overview.component';
import { EventsService, GroupedByEventCreator, DateTransformService } from '../services';

describe('EventsOverviewComponent', () => {
  describe('Isolated', () => {
    let component: EventsOverviewComponent;
    let eventsServiceMock: EventsService;
    let dateTransformServiceMock: DateTransformService;
    beforeEach(() => {
      eventsServiceMock = jasmine.createSpyObj('eventsServiceMock', ['groupEventsByName', 'getGroupedByMonthSeries']);
      dateTransformServiceMock = jasmine.createSpyObj('dateTransformServiceMock', ['transformTimeToHoursMinutes']);
      component = new EventsOverviewComponent(eventsServiceMock, dateTransformServiceMock);

      (<jasmine.Spy>eventsServiceMock.getGroupedByMonthSeries).and.returnValue([]);
    });

    it('should load overView from service to data', () => {
      const expectedOverview: Array<GroupedByEventCreator> = [{ name: 'name', totalCount: 10, totalDuration: 50 }];
      (<jasmine.Spy>eventsServiceMock.groupEventsByName).and.returnValue(expectedOverview);

      component.ngOnInit();

      expect(component.data).toEqual(expectedOverview);
    });

    it('should create data for Pie Chart', () => {
      const mockedData: Array<GroupedByEventCreator> = [
        { name: 'name', totalCount: 10, totalDuration: 50 },
        { name: 'name2', totalCount: 20, totalDuration: 150 },
        { name: 'name3', totalCount: 30, totalDuration: 350 }
      ];
      const expectedChartData: PieData = {
        labels: ['name', 'name2', 'name3'],
        series: [50, 150, 350]
      };
      (<jasmine.Spy>eventsServiceMock.groupEventsByName).and.returnValue(mockedData);

      component.ngOnInit();

      expect(component.pieChartData).toEqual(expectedChartData);
    });
  });

  describe('Test Bed', () => {
    let component: EventsOverviewComponent;
    let fixture: ComponentFixture<EventsOverviewComponent>;
    let eventsServiceStub;
    let dateTransformServiceStub;

    @Component({
      selector: 'chart-pie',
      template: `<div></div>`
    })
    // tslint:disable-next-line:component-class-suffix
    class PieChartComponentMock {
      @Input()
      public data: any;
    }

    @Component({
      selector: 'chart-distributed-bar',
      template: `<div></div>`
    })
    // tslint:disable-next-line:component-class-suffix
    class BarChartComponentMock {
      @Input()
      public data: any;

      @Input()
      labelYFcn: Function;
    }
    @Component({
      selector: 'chart-multi-line-bar',
      template: `<div></div>`
    })
    // tslint:disable-next-line:component-class-suffix
    class MultiLineBarChartComponentMock {
      @Input()
      public data: any;

      @Input()
      labelYFcn: Function;
    }

    @Pipe({
      name: 'timeSpan'
    })
    class TimeSpanPipe implements PipeTransform {
      transform(value: number, args?: any): string {
        return '';
      }

    }

    beforeEach(async(() => {
      eventsServiceStub = {
        groupEventsByName: jasmine.createSpy('getOverview').and.returnValue([]),
        getGroupedByMonthSeries: jasmine.createSpy('getGroupedByMonthSeries').and.returnValue([])
      };

      dateTransformServiceStub = {
        transformTimeToHoursMinutes: jasmine.createSpy('transformTimeToHoursMinutes')
      };

      TestBed.configureTestingModule({
        declarations: [
          EventsOverviewComponent,
          TimeSpanPipe,
          PieChartComponentMock,
          BarChartComponentMock,
          MultiLineBarChartComponentMock
        ],
        providers: [
          { provide: EventsService, useValue: eventsServiceStub },
          { provide: DateTransformService, useValue: dateTransformServiceStub }
        ]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(EventsOverviewComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
});
