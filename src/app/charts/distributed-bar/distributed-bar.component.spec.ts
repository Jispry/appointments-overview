/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Component } from '@angular/core';

import { ChartFactory, BarData } from '../chart.factory';
import { DistributedBarComponent } from './distributed-bar.component';

describe('DistributedBarComponent', () => {
  describe('Isolated', () => {
    let chartFactoryMock: ChartFactory;
    let component: DistributedBarComponent;

    beforeEach(() => {
      chartFactoryMock = jasmine.createSpyObj('chartFactory', ['createBar']);
      component = new DistributedBarComponent(chartFactoryMock);
    });

    it('should not call factory if no data', () => {
      component.ngOnInit();

      expect(chartFactoryMock.createBar).not.toHaveBeenCalled();
    });
  });
  describe('TestBed', () => {
    let component: DistributedBarComponent;
    let fixture: ComponentFixture<DistributedBarComponent>;
    let chartFactoryStub: any;

    beforeEach(async(() => {
      chartFactoryStub = {
        createDistributedBar: jasmine.createSpy('createDistributedBar')
      };
      TestBed.configureTestingModule({
        declarations: [DistributedBarComponent],
        providers: [
          { provide: ChartFactory, useValue: chartFactoryStub }
        ]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(DistributedBarComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
  describe('Test inside TestComponnent', () => {

    @Component({
      selector: 'test-component',
      template: `<chart-distributed-bar [data]="data"></chart-distributed-bar>`
    })
    class TestComponent {
      public data: BarData = {
        labels: ['a', 'b', 'c'],
        series: [[1, 2, 3]],
      };

      public isStacked: boolean;
    }

    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let chartFactoryStub: any;

    beforeEach(async(() => {
      chartFactoryStub = {
        createDistributedBar: jasmine.createSpy('createDistributedBar'),
      };

      TestBed.configureTestingModule({
        declarations: [TestComponent, DistributedBarComponent],
        providers: [
          { provide: ChartFactory, useValue: chartFactoryStub }
        ]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should call createDistributedBar', () => {
      expect(chartFactoryStub.createDistributedBar).toHaveBeenCalled();
    });
  });
});
