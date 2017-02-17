/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Component } from '@angular/core';

import { MultiLineBarComponent } from './multi-line-bar.component';
import { ChartFactory, BarData } from '../chart.factory';

describe('MultiLineBarComponent', () => {
  describe('Isolated', () => {
    let chartFactoryMock: ChartFactory;
    let component: MultiLineBarComponent;

    beforeEach(() => {
      chartFactoryMock = jasmine.createSpyObj('chartFactory', ['createBar']);
      component = new MultiLineBarComponent(chartFactoryMock);
    });

    it('should not call factory if no data', () => {
      component.ngOnInit();

      expect(chartFactoryMock.createBar).not.toHaveBeenCalled();
    });
  });
  describe('TestBed', () => {
    let component: MultiLineBarComponent;
    let fixture: ComponentFixture<MultiLineBarComponent>;
    let chartFactoryStub: any;

    beforeEach(async(() => {
      chartFactoryStub = {
        createBar: jasmine.createSpy('createBar')
      };
      TestBed.configureTestingModule({
        declarations: [MultiLineBarComponent],
        providers: [
          { provide: ChartFactory, useValue: chartFactoryStub }
        ]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(MultiLineBarComponent);
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
      template: `<chart-multi-line-bar [data]="data"></chart-multi-line-bar>`
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
        createBar: jasmine.createSpy('createBar'),
      };

      TestBed.configureTestingModule({
        declarations: [TestComponent, MultiLineBarComponent],
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

    it('should call createBar', () => {
      expect(chartFactoryStub.createBar).toHaveBeenCalled();
    });
  });
});
