/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { CalendarQueryComponent } from './calendar-query.component';
import { GoogleCalendarService } from '../google-api';
import { EventsCacheService } from '../services';

describe('CalendarQueryComponent', () => {
  describe('Isolated', () => {
    let component: CalendarQueryComponent;
    let calendarService: GoogleCalendarService;
    let eventCacheService: EventsCacheService;
    let ngZoneStub = {
      run: function (a) {
        a();
      }
    };
    let routerStub;

    beforeEach(() => {
      routerStub = {
        navigate: jasmine.createSpy('navigate')
      };

      calendarService = jasmine.createSpyObj('calendarService', ['getEvents']);
      eventCacheService = jasmine.createSpyObj('eventCacheService ', ['init']);
      component = new CalendarQueryComponent(null, <any>ngZoneStub, <any>routerStub, calendarService, eventCacheService);
    });

    it('#queryEvents should call googleCalendarService', () => {
      let queryObj = {};
      let subscribeSpy = jasmine.createSpy('subscribe');
      calendarService.getEvents = jasmine.createSpy('getEvents').and.returnValue({
        subscribe: subscribeSpy
      });

      component.queryEvents(queryObj);

      expect(calendarService.getEvents).toHaveBeenCalledWith(queryObj);
      expect(subscribeSpy).toHaveBeenCalled();
    });

    it('#toAnalysis should pass data from queryResult', () => {
      let expectedResults = {
        data: ['a', 'b'],
        monthFrom: 1,
        monthTo: 2
      };
      component.queryResult = expectedResults;

      component.toAnalysis();

      expect(eventCacheService.init).toHaveBeenCalledWith(expectedResults.data, expectedResults.monthFrom, expectedResults.monthTo);
    });

    it('#toAnalysis should navigate to overview', () => {
      component.queryResult = {
        data: ['a', 'b'],
        monthFrom: 1,
        monthTo: 2
      };

      component.toAnalysis();

      expect(routerStub.navigate).toHaveBeenCalledWith(['/overview']);
    });
  });

  describe('TestBed', () => {
    let component: CalendarQueryComponent;
    let fixture: ComponentFixture<CalendarQueryComponent>;
    let calendarServiceStub;
    let eventCacheServiceStub;
    let routerStub;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule],
        declarations: [CalendarQueryComponent],
        providers: [
          { provide: Router, useValue: routerStub },
          { provide: GoogleCalendarService, useValue: calendarServiceStub },
          { provide: EventsCacheService, useValue: eventCacheServiceStub }
        ],
        schemas: [NO_ERRORS_SCHEMA]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      routerStub = {
        navigate: jasmine.createSpy('navigate')
      };

      calendarServiceStub = {
        getEvents: jasmine.createSpy('getEvents')
      };

      eventCacheServiceStub = {
        init: jasmine.createSpy('init')
      };

      fixture = TestBed.createComponent(CalendarQueryComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
});
