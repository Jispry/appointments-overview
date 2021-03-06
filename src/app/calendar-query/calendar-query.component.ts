import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { GoogleCalendarService } from '../google-api';
import { EventsCacheService } from '../services';

interface QueryResult {
  data: Array<any>;
  monthFrom: number;
  monthTo: number;
}

@Component({
  selector: 'calendar-query',
  templateUrl: './calendar-query.component.html',
  styleUrls: ['./calendar-query.component.css']
})
export class CalendarQueryComponent implements OnInit {
  public queryForm: FormGroup;

  public queryResult: QueryResult;

  public months = [
    { name: 'January', value: 1 },
    { name: 'February', value: 2 },
    { name: 'March', value: 3 },
    { name: 'April', value: 4 },
    { name: 'May', value: 5 },
    { name: 'June', value: 6 },
    { name: 'July', value: 7 },
    { name: 'August', value: 8 },
    { name: 'September', value: 9 },
    { name: 'October', value: 10 },
    { name: 'November', value: 11 },
    { name: 'December', value: 12 },
  ];

  constructor(private formBuilder: FormBuilder, private zone: NgZone, private router: Router,
    private calendarService: GoogleCalendarService, private eventCache: EventsCacheService) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    // TODO isNumber Validation, from > To validation
    this.queryForm = this.formBuilder.group({
      monthFrom: [undefined, [Validators.required]],
      monthTo: [undefined, [Validators.required]],
    });
  }

  public queryEvents(query: any) {
    this.calendarService.getEvents(query)
      .subscribe((data) => {
        // Same force template refresh as in sign-in.component
        this.zone.run(() => {
          this.queryResult = {
            data: data,
            monthFrom: query.monthFrom,
            monthTo: query.monthTo
          };
        });
      });
  }

  public toAnalysis(): void {
    this.eventCache.init(this.queryResult.data, this.queryResult.monthFrom, this.queryResult.monthTo);
    this.router.navigate(['/overview']);
  }
}
