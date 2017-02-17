/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement } from '@angular/core';

import { PieComponent } from './pie.component';
import { ChartFactory, PieData } from '../chart.factory';

describe('PieComponent', () => {
  describe('Isolated', () => {
    let chartFactoryMock: ChartFactory;
    let component: PieComponent;

    beforeEach(() => {
      chartFactoryMock = jasmine.createSpyObj('chartFactory', ['createPie']);
      component = new PieComponent(chartFactoryMock);
    });

    it('should not call factory if no data', () => {
      component.ngOnInit();

      expect(chartFactoryMock.createPie).not.toHaveBeenCalled();
    });
  });
  describe('TestBed', () => {
    let component: PieComponent;
    let fixture: ComponentFixture<PieComponent>;
    let chartFactoryStub: any;
    beforeEach(async(() => {
      chartFactoryStub = {
        createPie: jasmine.createSpy('createPie')
      };

      TestBed.configureTestingModule({
        declarations: [PieComponent],
        providers: [
          { provide: ChartFactory, useValue: chartFactoryStub }
        ]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(PieComponent);
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
      template: `<chart-pie [data]="data"></chart-pie>`
    })
    class TestComponent {
      public data: PieData = {
        series: [1, 2, 3],
        labels: ['a', 'b', 'c']
      };
    }

    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let chartFactoryStub: any;

    beforeEach(async(() => {
      chartFactoryStub = {
        createPie: jasmine.createSpy('createPie')
      };

      TestBed.configureTestingModule({
        declarations: [TestComponent, PieComponent],
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

    it('should call chartFactory.Pie', () => {
      let chartDiv = fixture.debugElement.query(By.css('.ct-chart')).nativeElement;

      expect(chartFactoryStub.createPie).toHaveBeenCalledWith(chartDiv, component.data);
    });
  });
});
